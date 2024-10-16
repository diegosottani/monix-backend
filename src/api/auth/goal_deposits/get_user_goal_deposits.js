import { supabase } from "../../../init.js";

export const get_user_goal_deposits = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("goal_deposits")
      .select("deposit")
      .eq("goal_id", req.params.id);

    if (error) {
      throw error;
    }
    const deposits = data.reduce((acc, item) => acc + item.deposit, 0);

    return res.status(200).json({ deposits });
  } catch (error) {
    console.error("Erro ao recuperar depósitos de Objetivo:", error);
    return res.status(500).json(error);
  }
};
