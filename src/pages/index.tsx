import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useDeleteUser, useFetchUser } from "@/hooks/useUser";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const deleteUserMutation = useDeleteUser(); // Hook para deletar user
  const { data, isLoading, error } = useFetchUser(); // Hook para pegar todos os dados de user

  // Deletar o user selecionado pelo ID
  const handleDeleteUser = async (id: number) => {
    await deleteUserMutation.mutateAsync(id);
  };

  // error necessário do React Query
  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }
  return (
    <React.Fragment>
      <Head>
        <title>React query</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.center}>
          <h1> Example the of React Query</h1>
        </div>

        <div className="row">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link href={"create"}>
              <button className="btn btn-secondary btn-sm" type="button">
                +NOVO
              </button>
            </Link>
          </div>
          <div className="col-md-12">
            <div className="card-elevation ">
              <table className="table table-borderless table-hover table-responsive">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">password</th>
                    <th scope="col" className="text-right">
                      Opções
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <React.Fragment>
                      <tr>
                        <td colSpan={7} className="text-center">
                          <div className="d-flex justify-content-center">
                            <div
                              className="spinner-border text-secondary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {data.map((rowData: any) => (
                        <tr key={rowData.id}>
                          <td scope="row">{rowData.id}</td>
                          <td>{rowData.name}</td>
                          <td>{rowData.email}</td>
                          <td>{rowData.password}</td>
                          <td className="text-right">
                            <Link href={`${rowData.id}`} style={{margin: "0.2rem"}}>
                              <button className="btn btn-warning btn-sm">
                                <BsPencilSquare />
                              </button>
                            </Link>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDeleteUser(Number(rowData.id))
                              }
                            >
                              <BsTrash />
                             
                            </button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
