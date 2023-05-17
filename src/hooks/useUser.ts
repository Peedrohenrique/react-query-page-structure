import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { IUser } from "@/interfaces/IUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, fetchUserById, createUser, updateUser, deleteUser } from "@/services/userService";

// Hook de consulta para buscar o user chamando o userService
export const useFetchUser = () => {
    return useQuery<IUser[], Error>(["user"],fetchUser,
        {refetchOnWindowFocus: false, staleTime: 86400000}
    );
};

// Hook de consulta para buscar um user pelo ID chamando o userService
export const useFetchUserById = (id: number) => {
    return useQuery<IUser, Error>(["user", id], () => fetchUserById(id), {
        refetchOnWindowFocus: false, staleTime: 86400000});
};

// Hook de mutação para criar um user chamando o userService
export const useCreateUser = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation(createUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
            router.push("/");
            toast.success('User cadastrado!');
        },
    });
};

// Hook de mutação para atualizar um user chamando o userService
export const useUpdateUser = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation<IUser, unknown, { id: number, userAtualizado: IUser }>(
        async (data) => {
            const { id, userAtualizado } = data;
            return await updateUser(id, userAtualizado);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"]);
                router.push("/");
                toast.success('User Atualizado!');
            },
        }
    );
};

// Hook de mutação para deletar um user chamando o userService
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
   return useMutation((id: number) => deleteUser(id), {
     onSuccess: () => {
       queryClient.invalidateQueries(["user"]);
     },
   });
};