import { supabase } from "../init.js";

export const post_refresh_token = async (req, res) => {
  try {
    const refresh_token = req.body.refresh_token;
    const { data, error } = await supabase.auth.refreshSession({ refresh_token });

    if (error) throw error;

    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("Falha ao renovar token");
  }
};
