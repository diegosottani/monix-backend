import { supabase } from "../../../init.js";

export const get_user_planned_incoming_category = async (req, res) => {
  try {
    const planned_id = req.query.planned_id;
    const category_id = req.query.category;

    const { data, error } = await supabase
      .from("planned_incoming_category")
      .select("id, value")
      .eq("planned_incoming_id", planned_id)
      .eq("category_id", category_id);

    if (error) throw error;

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
