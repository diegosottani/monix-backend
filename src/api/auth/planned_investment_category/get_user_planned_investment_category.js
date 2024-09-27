import { supabase } from "../../../init.js";

export const get_user_planned_investment_category = async (req, res) => {
  try {
    const planned_id = req.query.planned_id;
    const category_id = req.query.category;

    const { data, error } = await supabase
      .from("planned_investment_category")
      .select("id, value")
      .eq("planned_investment_id", planned_id)
      .eq("category_id", category_id);

    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
