import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as components from "../components/ui/components";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

async function getImages(dispatch: any) {
  try {
    dispatch({ type: "LOAD_IMAGES", payload: undefined });
    const formData = new FormData(); // formData.append("action", "Send Mail");
    const config = {
      url: `api/images/?page=1&filter=new`,
      method: `GET`,
      timeout: 7000,
      // headers: {
      // Authorization: ``,
      // },
      data: formData,
    };
    const response = await axios(config);
    // @ts-ignore
    if (response.status !== 200 || response.status !== 201) {
      dispatch({ type: "DATA_IMAGES", payload: response.data.response });
    } else {
      dispatch({ type: "ERROR_IMAGES", payload: response.status });
    }
  } catch (error) {
    console.log(`error: `, error);
    // @ts-ignore
    dispatch({ type: "FAIL_IMAGES", payload: `error: ${error.toString()}` });
  }
}
// @ts-ignore
async function sendData(config: any, dispatch: any) {
  try {
    dispatch({ type: "LOAD_IMAGE_UPLOAD", payload: undefined });
    const response = await axios(config);
    // @ts-ignore
    if (response.status !== 200 || response.status !== 201) {
      dispatch({ type: "DATA_IMAGE_UPLOAD", payload: response.data.response });
    } else {
      dispatch({ type: "ERROR_IMAGE_UPLOAD", payload: undefined });
    }
  } catch (error) {
    console.log(`error: `, error);
    dispatch({
      type: "FAIL_IMAGE_UPLOAD",
      // @ts-ignore
      payload: undefined,
    });
  }
}

export default function Page() {
  const dispatch = useDispatch();

  const [imageFormObj, setImageFormObj] = useState({
    title: "",
    description: "",
    avatar: null,
    dangerAvatar: false,
  });

  // @ts-ignore
  const imagesStore = useSelector((state) => state.images);
  // @ts-ignore
  const imagesUpload = useSelector((state) => state.image_upload);

  const getData = async () => {
    await getImages(dispatch);

    // const response = await axios.get(`api/images/`);
    // console.log(response);

    // dispatch({ type: "ERROR_IMAGES", payload: 666 });
    // console.log(imagesStore);
  };

  useEffect(() => {
    if (imagesUpload.data) {
      setImageFormObj({
        title: "",
        description: "",
        avatar: null,
        dangerAvatar: false,
      });
      getData();
    }
  }, [imagesUpload.data]);

  useEffect(() => {
    console.log(imagesStore);
  }, [imagesStore]);

  useEffect(() => {
    console.log(imagesUpload);
  }, [imagesUpload]);

  async function formSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (imageFormObj.dangerAvatar) {
      return;
    }
    console.log("ИДЁТ ОТПРАВКА");
    // логика отправки
    const formData = new FormData();
    formData.append("title", imageFormObj.title);
    formData.append("description", imageFormObj.description);
    // @ts-ignore
    formData.append("avatar", imageFormObj.avatar);
    const config = {
      url: `api/images/upload/`,
      method: `POST`,
      timeout: 10000,
      // headers: {
      // Authorization: ``,
      // },
      data: formData,
    };
    await sendData(config, dispatch);
  }

  function formReset(event: FormEvent<HTMLFormElement>) {
    // логика сброса
    setImageFormObj({
      title: "",
      description: "",
      avatar: null,
      dangerAvatar: false,
    });
  }

  useEffect(() => {
    if (imageFormObj.avatar) {
      setImageFormObj({
        ...imageFormObj,
        // @ts-ignore
        dangerAvatar: imageFormObj.avatar.size > 10 * 1024 * 1024,
      });
    }
  }, [imageFormObj.avatar]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <header className="">Home page</header>
      <components.Accordion1
        accordionHeader={"Форма для добавления изображений!"}
        color={"bg-warning"}
        isCollapse={true}
      >
        {imagesUpload.load === true && (
          <div className="text-center alert alert-success" role="alert">
            Идёт загрузка!
          </div>
        )}
        {imagesUpload.error && (
          <div className="text-center alert alert-danger" role="alert">
            {imagesUpload.error}
          </div>
        )}
        {imagesUpload.fail && (
          <div className="text-center alert alert-danger" role="alert">
            {imagesUpload.fail}
          </div>
        )}
        {imagesUpload.data && (
          <div className="text-center alert alert-success" role="alert">
            {imagesUpload.data}
          </div>
        )}
        <form
          onSubmit={(event) => formSubmit(event)}
          onReset={(event) => formReset(event)}
        >
          <div className="card shadow m-0 p-0">
            <div className="card-header bg-success bg-opacity-10 m-0 p-2">
              <h6 className="lead fw-bold m-0 p-0">
                Отправить новое изображение
              </h6>
              <h6 className="lead m-0 p-0">в общий список</h6>
            </div>
            <div className="card-body m-0 p-0">
              <div className="m-0 p-0">
                <label className="form-control-sm text-center w-75 m-0 p-1">
                  Название:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    placeholder="введите название тут..."
                    minLength={5}
                    maxLength={300}
                    required
                    value={imageFormObj.title}
                    onChange={(event) =>
                      setImageFormObj({
                        ...imageFormObj, // этот '...' оператор аналог *args/**kwargs
                        title: event.target.value.replace(
                          new RegExp(`[^$0-9А-Яа-я]`, "g"),
                          ""
                        ),
                      })
                    }
                  />
                  <small className="text-warning m-0 p-0">
                    * только кириллица и цифры
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: не менее 5 и более 300 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-0">
                <label className="w-100 form-control-sm m-0 p-1">
                  Описание идеи:
                  <textarea
                    className="form-control form-control-sm text-center m-0 p-1"
                    placeholder="введите описание тут..."
                    minLength={0}
                    maxLength={1000}
                    rows={3}
                    value={imageFormObj.description}
                    onChange={(event) =>
                      setImageFormObj({
                        ...imageFormObj,
                        description: event.target.value.replace(
                          new RegExp(`[^$0-9А-Яа-яA-Za-z!,.]`, "g"),
                          ""
                        ),
                      })
                    }
                  />
                  <small className="m-0 p-0">
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: не более 1000 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-0">
                <label className="form-control-sm text-center m-0 p-1">
                  Аватарка-заставка:
                  {imageFormObj.dangerAvatar && (
                    <div className="alert alert-danger" role="alert">
                      Изображение слишком крупное (нужно менее 10 мб)!
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control form-control-sm text-center m-0 p-1"
                    accept=".jpg, .jpeg, .bmp, .png"
                    onChange={(event) =>
                      setImageFormObj({
                        ...imageFormObj,
                        // @ts-ignore
                        avatar: event.target.files[0],
                      })
                    }
                  />
                  <small className="text-muted m-0 p-0">* не обязательно</small>
                </label>
              </div>
            </div>

            <div className="card-footer m-0 p-0">
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <button
                  className={
                    imageFormObj.dangerAvatar
                      ? "btn btn-sm btn-primary m-1 p-2 disabled"
                      : "btn btn-sm btn-primary m-1 p-2"
                  }
                  type="submit"
                >
                  <i className="fa-solid fa-circle-check m-0 p-1" />
                  отправить данные
                </button>
                <button className="btn btn-sm btn-warning m-1 p-2" type="reset">
                  <i className="fa-solid fa-pen-nib m-0 p-1" />
                  сбросить данные
                </button>
              </ul>
            </div>
          </div>
        </form>
      </components.Accordion1>

      {imagesStore.load === true && (
        <div className="text-center alert alert-warning" role="alert">
          Идёт загрузка!
        </div>
      )}
      {imagesStore.err !== undefined && <div>{imagesStore.err}</div>}
      {imagesStore.fail !== undefined && <div>{imagesStore.fail}</div>}

      <div className="container container-fluid">
        {imagesStore.data && imagesStore.data.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            {imagesStore.data.map(
              (
                // @ts-ignore
                item: {
                  title: string;
                  avatar: string;
                  id: number;
                  created: string;
                },
                // @ts-ignore
                index: number
              ) => (
                <div
                  key={item.id}
                  className="col card shadow m-0 p-0 text-center"
                >
                  <div className={"card-header m-0 p-1"}>{item.title}</div>
                  <div className={"card-body m-0 p-0 text-center"}>
                    <img
                      className="img-fluid"
                      width={"250"}
                      // src={`/static/img/new.jpg`}
                      src={`/static${item.avatar}`}
                      alt={"image"}
                    />
                  </div>
                  <div className={"card-footer m-0 p-1 text-center"}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">
                        {item.created.split("T")[0]}{" "}
                        {item.created.split("T")[1].split("+")[0]}
                      </small>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : imagesStore.load === true ? (
          ""
        ) : (
          <div className="col card shadow">данных нет</div>
        )}
      </div>
    </div>
  );
}
