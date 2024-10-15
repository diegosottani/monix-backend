import { supabase } from '../../../init.js';

export const get_user_goals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("goals")
      .select(`
        id,
        user_id,
        name,
        initial_value,
        deadline,
        desired_value
      `)
      .eq("user_id", req.user.id);

    if (error) {
      throw error;
    }

    const updatedData = await Promise.all(data.map(async goal => ({
      ...goal,
      deposits: await getDeposits(goal.id)
    })));

    return res.status(200).send(updatedData);
  } catch (error) {
    console.error('Erro ao recuperar objetivos:', error);
    return res.status(500).json({ error: 'Erro ao recuperar objetivos' });
  }
};

async function getDeposits(goal_id) {
  const { data, error } = await supabase
    .from("goal_deposits")
    .select("deposit")
    .eq("goal_id", goal_id);

  if (error) {
    throw error;
  }
  
  const totalDeposits = data.reduce((acc, item) => acc + item.deposit, 0);
  return totalDeposits;
}