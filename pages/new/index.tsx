// import { CustomInput } from "../../components/shared/Inputs";
// import styles from "./style.module.css";
// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// const New = () => {
//   const dataSubmitHandler = async (
//     values: any,
//     { setSubmitting, resetForm }: any
//   ) => {
//     const data = {
//       wallet: "0xabcd",
//       address: values.address,
//       description: values.description,
//       type: values.type,
//       image: values.image,
//       lattitude: "100000",
//       longitude: "100000",
//     };
//     console.log(data);
//   };
//   return (
//     <div className={styles.container}>
//       <h3>New Profile</h3>
//       <div className={styles.formDiv}>
//         <Formik
//           initialValues={{
//             name: "",
//             bio: "",
//             birthday: "",
//             gender: "",
//             address: "",
//             image: "",
//           }}
//           validationSchema={Yup.object({
//             name: Yup.string().required("Required"),
//             bio: Yup.string()
//               .min(4, "Must be 4 characters or more")
//               .max(100, "Must be 100 characters or less")
//               .required("Required"),
//             birthday: Yup.string().required("Required"),
//             gender: Yup.string().required("Required"),
//             image: Yup.string().required("Required"),
//           })}
//           onSubmit={dataSubmitHandler}
//         >
//           {({ setFieldValue, errors, touched, ...props }) => (
//             <Form>
//               <CustomInput name="name" placeholder="Name" />
//               <CustomInput name="bio" placeholder="Bio" textarea />
//               <CustomInput name="birthday" placeholder="Birthday" />
//               <CustomInput name="gender" placeholder="Gender" />
//               <CustomInput name="address" placeholder="Address" />
//               <CustomInput name="image" placeholder="Add image" />
//               <div className={styles.submitButtonDiv}>
//                 <button type="submit">Submit</button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default New;

import { useState } from "react";

import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { DID } from "dids";
import { IDX } from "@ceramicstudio/idx";

const endpoint = "https://ceramic-clay.3boxlabs.com";

import { useAddress } from "@thirdweb-dev/react";

function New() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const address = useAddress();

  async function readProfile() {
    const ceramic: any = new CeramicClient(endpoint);
    const idx = new IDX({ ceramic });
    if (address) {
      try {
        const data = await idx.get("basicProfile", `${address}@eip155:1`);
        console.log("data: ", data);
      } catch (error) {
        console.log("error: ", error);
        setLoaded(true);
      }
    }
  }

  async function updateProfile() {
    console.log("init");
    const ceramic: any = new CeramicClient(endpoint);
    console.log("ceramic is here", ceramic);

    const threeIdConnect = new ThreeIdConnect();
    console.log("3id connect is here", threeIdConnect);

    if (address) {
      console.log("address is here");
      console.log(ThreeIdResolver);
      const provider = new EthereumAuthProvider(window.ethereum, address);
      console.log("providor is here");

      await threeIdConnect.connect(provider);
      console.log("providor is connected");

      const did: any = new DID({
        provider: threeIdConnect.getDidProvider(),
        resolver: {
          ...ThreeIdResolver.getResolver(ceramic),
        },
      });
      console.log("did is got");

      ceramic.setDID(did);
      console.log("did is set");

      if (ceramic && ceramic.did) {
        await ceramic.did.authenticate();
        const idx = new IDX({ ceramic });
        await idx.set("basicProfile", {
          name,
          avatar: image,
        });
        console.log("Profile updated!");
      }
    }
  }

  return (
    <div className="New mt-[10rem] pt-[10rem]">
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input
        placeholder="Profile Image"
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={updateProfile}>Set Profile</button>
      <button onClick={readProfile}>Read Profile</button>

      {name && <h3>{name}</h3>}
      {image && <img style={{ width: "400px" }} src={image} />}
      {!image && !name && loaded && <h4>No profile, please create one...</h4>}
    </div>
  );
}

export default New;
