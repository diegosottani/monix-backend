import { supabase } from '../../../init.js';

export const put_user_planned_incoming = async (req, res) => {
    try {
        const planned_incoming_id = req.params.id;
        const updated_planned_incoming = {
            month: req.body.month,
            year: req.body.year,
        };

        const { error } = await supabase
            .from('planned_incoming')
            .update(updated_planned_incoming)
            .eq('id', planned_incoming_id);

        if (error) {
            throw error;
        }

        return res.status(200).send("Entrada planejada atualizada com sucesso");
    } catch (error) {
        console.error('Erro ao atualizar receita planejada:', error);
        return res.status(500).json({ error: 'Erro ao atualizar entrada planejada' });
    }
};
