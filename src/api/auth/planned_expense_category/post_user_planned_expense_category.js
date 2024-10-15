import { supabase } from '../../../init.js';

export const post_user_planned_expense_category = async (req, res) => {
    try {
        const { planned_expense_id, category_id, value } = req.body;

        if (!planned_expense_id || !category_id || isNaN(value)) {
            return res.status(400).json({ error: 'É necessário preencher todos os campos' });
        }

        const { error } = await supabase
        .from('planned_expense_category')
        .insert({
            planned_expense_id,
            category_id,
            value
        });

        if (error) {
            throw error;
        }

        return res.status(201).send('Categoria de planejamento de despesa criada com sucesso');
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error);
    }

}