import { supabase } from '../../../init.js';

export const put_user_planned_expense_subcategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { value } = req.body;
        
        if (isNaN(value)) {
            res.status(400).json({ error: 'É necessário preencher todos os campos' });
        }        

        const { error } = await supabase
            .from('planned_expense_subcategory')
            .update({ value })
            .eq('id', id);

        if (error) {
            throw error;
        }

        res.status(200).send("Subcategoria de despesa planejada atualizada com sucesso");
    } catch (error) {
        console.error('Erro ao atualizar subcategoria de despesa planejada:', error);
        res.status(500).json({ error: 'Erro ao atualizar subcategoria da despesa planejada' });
    }
};