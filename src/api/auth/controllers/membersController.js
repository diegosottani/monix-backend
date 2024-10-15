import { memberOnDefault } from "../../../database/updateDefaultOnDelete.js";
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../services/membersService.js";

export const get_members = async (req, res) => {
  try {
    const { data, error } = await getMembers(req.user.id);
    if (error) throw error;

    return res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao recuperar dados do membro familiar:", error);
    res
      .status(500)
      .json({ error: "Erro ao recuperar dados do membro familiar" });
  }
};

export const post_members = async (req, res) => {
  try {
    if (!req.body.name) {
      res
        .status(400)
        .json({ error: "O nome do membro da família é obrigatório" });
    }

    const { error } = await createMember(req.user.id, req.body);
    if (error) throw error;

    return res.status(200).send("Membro da família cadastrado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar membro familiar:", error);
    return res.status(500).json({ error: "Erro ao recuperar dados do membro familiar" });
  }
};

export const put_members = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.name) {
      return res.status(400).json({ error: "O nome do membro da família é obrigatório" });
    }

    const { error } = await updateMember(id, req.body);
    if (error) throw error;

    return res.status(200).send("Membro familiar atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar o membro familiar:", error);
    return res.status(500).json({ error: "Erro ao atualizar dados do membro familiar" });
  }
};

export const delete_members = async (req, res) => {
  try {
    const id = req.params.id;
    await memberOnDefault(id);
    const { error } = await deleteMember(id);
    if (error) throw error;

    return res.status(200).send("Membro familiar excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir membro familiar:", error);
    return res.status(500).json({ error: "Erro ao deletar o membro familiar" });
  }
};
