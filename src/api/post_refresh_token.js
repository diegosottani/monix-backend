import { supabase } from "../init";

export const post_refresh_token = async (req, res) => {
  try {
    const refresh_token = req.body.refresh_token;
    const { data, error } = await supabase.auth.refreshSession({ refresh_token });

    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("Falha ao renovar token");
  }
};
