import { supabase } from "../../../init";

export const get_user_planned_incoming_category = async (req, res) => {
  try {
    const user_id = req.user.id;
    const category_id = req.query.category;

    const { data, error } = await supabase
      .from("planned_incoming_category")
      .select("value")
      .eq("id", user_id)
      .eq("category_id", category_id);

    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
