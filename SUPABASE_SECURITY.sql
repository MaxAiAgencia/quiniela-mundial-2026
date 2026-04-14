-- [SECURITY HARDENING - MANUAL EXECUTION]
-- Copia y pega esto en el SQL Editor de tu Supabase Dashboard.

-- 1. Transparencia de Predicciones (Solo ver rivales si el partido empezó)
DROP POLICY IF EXISTS "predictions_select" ON quiniela_predictions;
CREATE POLICY "predictions_select" ON public.quiniela_predictions 
FOR SELECT USING (
  user_id = auth.uid() OR 
  locked = TRUE OR 
  quiniela_id IN (SELECT id FROM quinielas WHERE admin_id = auth.uid())
);

-- 2. Gestión de Participantes (Evitar recursión infinita en RLS)
DROP POLICY IF EXISTS "participants_select" ON quiniela_participants;
DROP POLICY IF EXISTS "participants_select_v2" ON quiniela_participants;
CREATE POLICY "participants_select_v2" ON public.quiniela_participants
FOR SELECT TO authenticated
USING (
  user_id = auth.uid() 
  OR EXISTS (SELECT 1 FROM public.quinielas WHERE id = quiniela_id AND admin_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  OR true -- Lectura pública autenticada para rankings
);

DROP POLICY IF EXISTS "participants_insert" ON quiniela_participants;
CREATE POLICY "participants_insert_v3" ON public.quiniela_participants
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "participants_update_user" ON quiniela_participants;
DROP POLICY IF EXISTS "participants_update_user_v2" ON quiniela_participants;
CREATE POLICY "participants_update_user_v2" ON public.quiniela_participants 
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "participants_update_admin" ON quiniela_participants;
DROP POLICY IF EXISTS "participants_update_admin_v2" ON quiniela_participants;
CREATE POLICY "participants_update_admin_v2" ON public.quiniela_participants 
FOR UPDATE TO authenticated
USING (
  quiniela_id IN (SELECT id FROM quinielas WHERE admin_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- 3. Bitácora de Auditoría de Pagos
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ DEFAULT now(),
  actor_id    UUID,
  action      TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id   UUID,
  old_data    JSONB,
  new_data    JSONB
);

-- Habilitar RLS en auditoría (Solo admin lee)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_read_audit" ON audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Función para auditar y proteger la validación de pagos
CREATE OR REPLACE FUNCTION audit_payment_validation() 
RETURNS TRIGGER AS $$
DECLARE
  is_admin_user BOOLEAN;
BEGIN
  -- Verificar si el que ejecuta es el admin (tú)
  SELECT is_admin 
  INTO is_admin_user 
  FROM profiles 
  WHERE id = auth.uid();

  -- BLOQUEO: Si NO es admin, no puede cambiar 'paid' ni 'user_id'
  IF (is_admin_user IS NOT TRUE) THEN
    IF (OLD.paid != NEW.paid OR OLD.user_id != NEW.user_id) THEN
      RAISE EXCEPTION 'No tienes permiso para modificar el estatus de pago o el ID de usuario.';
    END IF;
  END IF;

  -- AUDITORÍA: Si el admin cambia el estatus a pagado, registrar en la bitácora
  IF (OLD.paid = FALSE AND NEW.paid = TRUE) THEN
    INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, old_data, new_data)
    VALUES (auth.uid(), 'PAYMENT_VERIFIED', 'quiniela_participants', NEW.id, to_jsonb(OLD), to_jsonb(NEW));
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_audit_payment ON quiniela_participants;
CREATE TRIGGER tr_audit_payment
  AFTER UPDATE OF paid ON quiniela_participants
  FOR EACH ROW EXECUTE FUNCTION audit_payment_validation();
