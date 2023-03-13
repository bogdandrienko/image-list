import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

async function getImages(dispatch: any) {
  try {
    dispatch({ type: "LOAD_IMAGES", payload: undefined });
    const formData = new FormData(); // formData.append("action", "Send Mail");
    const config = {
      url: `api/images/?page=1&filter=new`,
      method: `GET`,
      timeout: 7000,
      headers: {
        Authorization: ``,
      },
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

export default function Page() {
  const dispatch = useDispatch();

  // @ts-ignore
  const imagesStore = useSelector((state) => state.images);

  const getData = async () => {
    await getImages(dispatch);

    // const response = await axios.get(`api/images/`);
    // console.log(response);

    // dispatch({ type: "ERROR_IMAGES", payload: 666 });
    // console.log(imagesStore);
  };

  useEffect(() => {
    console.log(imagesStore);
  }, [imagesStore]);

  return (
    <div className="App">
      <header className="">Home page</header>
      {/*<div>{imagesStore}</div>*/}
      {imagesStore.load === true && <div>Идёт загрузка</div>}
      {imagesStore.err !== undefined && <div>{imagesStore.err}</div>}
      {imagesStore.fail !== undefined && <div>{imagesStore.fail}</div>}

      {imagesStore.data && imagesStore.data.length > 0 ? (
        <ul>
          {imagesStore.data.map(
            (
              // @ts-ignore
              item: { title: string; avatar: string; id: number },
              // @ts-ignore
              index: number
            ) => (
              <li key={item.id}>
                {item.title} <img src={`/static${item.avatar}`} />
              </li>
            )
          )}
        </ul>
      ) : imagesStore.load === true ? (
        ""
      ) : (
        <div>данных нет</div>
      )}
      <button onClick={getData}>set</button>
    </div>
  );
}
