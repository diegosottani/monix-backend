import { supabase } from '../../../init.js';

export const get_goals_info = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const goalsInfo = [];

    goals.forEach(goal => {
      const { name, initial_value, deadline, desired_value } = goal;

      const currentDate = new Date();
      const deadlineDate = new Date(deadline);
      const monthsLeft = Math.max(0, (deadlineDate.getFullYear() - currentDate.getFullYear()) * 12 + deadlineDate.getMonth() - currentDate.getMonth());

      const idealDeposit = monthsLeft > 0 ? Math.max(0, (initial_value - desired_value) / monthsLeft) : 0;

      const goalInfo = {
        'descrição do objetivo': name,
        'saldo inicial': initial_value,
        'saldo desejado': desired_value,
        'deadline final': deadline,
        'meses faltantes': monthsLeft,
        'valor ideal para depositar no mês': idealDeposit
      };

      goalsInfo.push(goalInfo);
    });

    res.status(200).json(goalsInfo);
  } catch (error) {
    console.error('Erro ao obter informações dos objetivos:', error);
    res.status(500).json({ error: 'Erro ao obter informações dos objetivos' });
  }
};
