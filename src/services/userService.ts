import { toast } from "react-toastify";
import API_USER from "@/providers/index";
import { IUser } from "@/interfaces/IUser";

// Função para buscar os users
export const fetchUser = async (): Promise<IUser[]> => {
  return await API_USER.get<IUser[]>(`user`).then(
    (response) => response.data
  );
};

// Função para buscar um user pelo ID
export const fetchUserById = async (id: number): Promise<IUser> => {
  return await API_USER.get<IUser>(`user/${id}`).then(
    (response) => response.data
  );
};

// Função para criar um user
export const createUser = async (novoUser: IUser): Promise<IUser> => {
  try {
    const response = await API_USER.post<IUser>("user", novoUser,
      {headers:{ "Content-Type": "application/json"}}
    );
    return response.data;
  } catch (error: any) {
    const { data } = error.response;
    toast.error(data.message[0]);
    throw error;
  }
};

// Função para atualizar um user
export const updateUser = async (id: number, userAtualizado: IUser): Promise<IUser> => {
  try {
    const response = await API_USER.patch<IUser>(`user/${id}`, userAtualizado,
      {headers:{"Content-Type": "application/json"}});
    return response.data;
  } catch (error: any) {
    const { data } = error.response;
    toast.error(data.message[0]);
    throw error;
  }
};

// Função para deletar um user
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await API_USER.delete(`user/${id}`);
    console.log(id)
  } catch (error) {
    toast.error("Erro ao deletar o user!");
    throw error;
  }
};