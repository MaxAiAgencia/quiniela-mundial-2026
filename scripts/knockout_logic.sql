-- ============================================================
-- FIFA WORLD CUP 2026 — LÓGICA DE PROMOCIÓN A ELIMINATORIAS
-- ============================================================

-- Función para promover equipos a la Ronda de 32 (Dieciseisavos)
CREATE OR REPLACE FUNCTION promote_group_qualifiers()
RETURNS TRIGGER AS $$
DECLARE
    v_group_id TEXT;
    v_finished_count INTEGER;
    v_team1 RECORD;
    v_team2 RECORD;
    v_team3 RECORD;
BEGIN
    -- Solo actuar si el partido terminó y es de fase de grupos
    IF NEW.status = 'finished' AND NEW.phase = 'group' THEN
        v_group_id := NEW.group_id;
        
        -- Contar partidos terminados en este grupo
        SELECT COUNT(*) INTO v_finished_count 
        FROM matches 
        WHERE group_id = v_group_id AND status = 'finished';

        -- Si el grupo terminó (6 partidos por grupo de 4 equipos)
        IF v_finished_count = 6 THEN
            -- Obtener 1ro y 2do del grupo
            -- Orden: Puntos DESC, Diferencia Goles DESC, Goles Favor DESC
            SELECT team_id INTO v_team1 
            FROM standings 
            WHERE group_id = v_group_id 
            ORDER BY points DESC, goal_diff DESC, goals_for DESC 
            LIMIT 1;

            SELECT team_id INTO v_team2 
            FROM standings 
            WHERE group_id = v_group_id 
            ORDER BY points DESC, goal_diff DESC, goals_for DESC 
            LIMIT 1 OFFSET 1;

            -- Mapeo de Promoción (Simplified 2026 Bracket)
            -- 1ro Lugar (Winner)
            CASE v_group_id
                WHEN 'A' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 74;
                WHEN 'B' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 75;
                WHEN 'C' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 77;
                WHEN 'D' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 78;
                WHEN 'E' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 79;
                WHEN 'F' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 80;
                WHEN 'G' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 81;
                WHEN 'H' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 82;
                WHEN 'I' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 83;
                WHEN 'J' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 84;
                WHEN 'K' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 85;
                WHEN 'L' THEN UPDATE matches SET home_team_id = v_team1.team_id WHERE match_number = 86;
            END CASE;

            -- 2do Lugar (Runner-up)
            CASE v_group_id
                WHEN 'A' THEN UPDATE matches SET home_team_id = v_team2.team_id WHERE match_number = 73;
                WHEN 'B' THEN UPDATE matches SET away_team_id = v_team2.team_id WHERE match_number = 73;
                WHEN 'C' THEN UPDATE matches SET home_team_id = v_team2.team_id WHERE match_number = 76;
                WHEN 'D' THEN UPDATE matches SET away_team_id = v_team2.team_id WHERE match_number = 76;
                WHEN 'E' THEN UPDATE matches SET away_team_id = v_team2.team_id WHERE match_number = 87;
                WHEN 'F' THEN UPDATE matches SET home_team_id = v_team2.team_id WHERE match_number = 87;
                WHEN 'G' THEN UPDATE matches SET away_team_id = v_team2.team_id WHERE match_number = 82;
                WHEN 'H' THEN UPDATE matches SET away_team_id = v_team2.team_id WHERE match_number = 80; -- (Simplificado)
                WHEN 'I' THEN UPDATE matches SET away_team_id = v_team2.team_id WHERE match_number = 84;
                WHEN 'J' THEN UPDATE matches SET home_team_id = v_team2.team_id WHERE match_number = 88;
                WHEN 'K' THEN UPDATE matches SET away_team_id = v_team2.team_id WHERE match_number = 86;
                WHEN 'L' THEN UPDATE matches SET away_team_id = v_team2.team_id WHERE match_number = 88;
            END CASE;

            -- Marcar equipos como clasificados
            UPDATE standings SET qualified = TRUE WHERE team_id IN (v_team1.team_id, v_team2.team_id);
            
            -- Lógica de Mejores Terceros (Solo cuando todos los grupos terminan)
            IF (SELECT COUNT(DISTINCT group_id) FROM matches WHERE status = 'finished' AND phase = 'group') = 12 THEN
               PERFORM resolve_best_thirds();
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Función para resolver los 8 mejores terceros lugares
CREATE OR REPLACE FUNCTION resolve_best_thirds()
RETURNS VOID AS $$
DECLARE
    v_third RECORD;
    v_count INTEGER := 0;
BEGIN
    -- Los mejores 8 terceros de los 12 grupos
    FOR v_third IN 
        SELECT team_id FROM standings 
        WHERE team_id NOT IN (
            SELECT team_id FROM (
                SELECT team_id FROM standings ORDER BY group_id, points DESC, goal_diff DESC LIMIT 2
            ) as top2
        )
        ORDER BY points DESC, goal_diff DESC, goals_for DESC 
        LIMIT 8
    LOOP
        v_count := v_count + 1;
        -- Asignar a slots vacíos de terceros (Simplificado: 74, 75, 77, 78, 79, 81, 83, 85)
        UPDATE matches SET away_team_id = v_third.team_id 
        WHERE match_number IN (74, 75, 77, 78, 79, 81, 83, 85) 
        AND away_team_id IS NULL 
        LIMIT 1;

        UPDATE standings SET qualified = TRUE WHERE team_id = v_third.team_id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger para ejecutar la promoción
DROP TRIGGER IF EXISTS tr_promote_qualifiers ON matches;
CREATE TRIGGER tr_promote_qualifiers
AFTER UPDATE ON matches
FOR EACH ROW
EXECUTE FUNCTION promote_group_qualifiers();
