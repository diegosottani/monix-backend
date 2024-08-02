import { supabase } from '../../../init';

export const post_user_planned_incoming_category= async (req, res) => {
    try {
        const { planned_incoming_id, category_id, value } = req.body;

        if (!planned_incoming_id || !category_id || isNaN(value)) {
            res.status(400).json({ error: 'É necessário preencher todos os campos' });
        }

        const { error } = await supabase
        .from('planned_incoming_category')
        .insert({
            planned_incoming_id,
            category_id,
            value
        });

        if (error) throw error;

        res.status(201).send('Categoria de entrada planejada criada com sucesso');
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error);
    }

}