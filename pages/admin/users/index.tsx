import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  deleteUser,
  loadUser,
  updateUser,
  register,
  addUser,
} from "@/redux/actions";
import { GetStaticProps } from "next";
import { wrapper } from "@/redux/store";
import { END } from "redux-saga";
import { GetServerSideProps } from "next";
import EditForm from "@/components/admin/editForm";
import { Button, Modal, Pagination } from "antd";
import { useRouter } from "next/router";
import AddForm from "@/components/admin/addForm";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
type Props = {};

interface DataType {
  name: string;
  role: number;
  email: string;
  _id: string;
}

const index = (props: Props) => {
  const dispatch = useDispatch();
  const { users, loading, isUpdated, isDeleted, success } = useSelector(
    (state: any) => state.admin
  );
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [close, setClose] = useState(true);
  const [text, setText] = useState("");
  const [role, setRole] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    dispatch(loadUser());

    if (router.query.text) {
      setText(router.query.text as any);
      setSearch(router.query.text as any);
    }

    if (router.query.role) {
      setRole(router.query.role as any);
      setSearchRole(router.query.role as any);
    }

    if (router.query.page) setPage(Number(router.query.page));

    dispatch(
      allUsers({
        keyword: router.query.text || "",
        currentPage: router.query.page || 1,
        role: router.query.role,
      })
    );
  }, [dispatch, isUpdated, isDeleted, success, router, page]);

  const handleOk = (index: any) => {
    let open: any = isModalOpen;

    open[index] = false;
    console.log(open);
    setIsModalOpen(open);
    setClose(!close);
  };

  const handleCancel = (index: any) => {
    let open: any = isModalOpen;
    open[index] = false;
    console.log(open);
    setIsModalOpen(open);
    setClose(!close);
  };
  const showModal = (index: any) => {
    let open: any = [];
    for (let i = 0; i < users.users.length; i++) {
      open[i] = false;
    }
    open[index] = true;
    console.log(open);

    setIsModalOpen(open);
  };
  const showModalAdd = () => {
    setIsAddModalOpen(true);
  };
  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const update = (id: any, data: any) => {
    dispatch(updateUser(id, data));
  };

  const registerUser = (data: any) => {
    dispatch(addUser(data));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setSearch(text);
    setSearchRole(role);
    router.push({
      pathname: router.pathname,
      query: { text: text, role: role, page: 1 },
    });
  };

  const setPagePagination = (currentPage: any) => {
    setPage(currentPage);

    router.push({
      pathname: router.pathname,
      query: { text: search, role: searchRole, page: currentPage },
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, user, index) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(index)}>
            Sửa
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen[index]}
            onOk={() => handleOk(index)}
            onCancel={() => handleCancel(index)}
          >
            <EditForm
              onOk={() => handleOk(index)}
              user={user}
              updateUser={update}
            />
          </Modal>

          <Button onClick={() => dispatch(deleteUser(user._id))} type="dashed">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      {user?.role === "admin" ? (
        <div className="container">
          <Button onClick={showModalAdd} type="primary">
            Thêm tài khoản
          </Button>
          <Modal
            title="Thêm tài khoản"
            open={isAddModalOpen}
            onOk={handleCancelAdd}
            onCancel={handleCancelAdd}
          >
            <AddForm
              onOk={() => handleCancelAdd()}
              user={user}
              register={registerUser}
            />
          </Modal>
          <div className="d-flex justify-content-center">
            <div className="col-md-4 mx-2">
              <div onSubmit={submitHandler} className="mb-3">
                <label className="form-label">Tìm kiếm</label>
                <input
                  type="text"
                  value={text}
                  className="form-control"
                  onChange={(e) => setText(e.target.value)}
                />
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  type="button"
                  className="btn btn-primary mt-1"
                  onClick={submitHandler}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
          <Table
            rowKey={"_id"}
            columns={columns}
            dataSource={!!users && !!users.users && users.users}
          />
          ;
          {!!users && !!users.users && users.filteredUsersCount / 3 > 1 && (
            <div className="text-center">
              <Pagination
                total={users.filteredUsersCount}
                pageSize={3}
                current={page}
                showQuickJumper={true}
                onChange={(page) => setPagePagination(page)}
              />
            </div>
          )}
        </div>
      ) : (
        <div>Bạn không có quyền xem nội dung này</div>
      )}
    </>
  );
};

export default index;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => () => {
    store.dispatch(allUsers());
    //store.dispatch(loadUser())
    store.dispatch(END);
  }
);
