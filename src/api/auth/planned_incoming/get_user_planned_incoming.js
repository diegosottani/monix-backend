import { supabase } from '../../../init';

export const get_user_planned_incoming = async (req, res) => {
    try {
        const month = req.query.month;
        const year = req.query.year;

        if (month === undefined || year === undefined) {
            res.status(400).json({ error: 'É necessário preencher todos os campos obrigatórios' });
            return;
        }
        
        let query = supabase
            .from('planned_incoming')
            .select(`
                id,
                user_id,
                month,
                year
            `)
            .eq('user_id', req.user.id);
            
        if(month != 0 && year != 0) {
            query = query.eq('month', month);
            query = query.eq('year', year);
        } else {
            query = query.eq('year', new Date().getFullYear());
        }

        const { data, error } = await query;

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
