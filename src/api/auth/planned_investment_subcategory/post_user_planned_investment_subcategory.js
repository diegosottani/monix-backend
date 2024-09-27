import { supabase } from '../../../init.js';

export const post_user_planned_investment_subcategory = async (req, res) => {
    try {
        const { planned_investment_category_id, subcategory_id, value } = req.body;
        if (!planned_investment_category_id || !subcategory_id || isNaN(value)) {
            res.status(400).json({ error: 'É necessário preencher todos os campos' });
        }

        const { error } = await supabase
        .from('planned_investment_subcategory')
        .insert({
            planned_investment_category_id,
            subcategory_id,
            value
        });

        if (error) {
            throw error;
        }

        res.status(201).send('Subcategoria de despesa planejada criada com sucesso');
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao criar subcategoria de despesa planejada' });
    }
}