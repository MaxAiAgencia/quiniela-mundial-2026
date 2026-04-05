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

-- 2. Blindaje de Estatus "PAID" (Para que el usuario no pueda hackear su estatus)
DROP POLICY IF EXISTS "participants_update" ON quiniela_participants;

-- El usuario solo puede subir su comprobante si NO ha sido pagado aún
-- El usuario solo puede actualizar su propia fila (por ejemplo para subir comprobante)
CREATE POLICY "participants_update_user" ON public.quiniela_participants 
FOR UPDATE USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- El Admin (Tú) puede cambiar todo
CREATE POLICY "participants_update_admin" ON public.quiniela_participants 
FOR UPDATE USING (
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
