// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  query,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQXoksw3C47bOWg7scIbsJWLVTPeT97p0",
  authDomain: "estudio-diez-streaming.firebaseapp.com",
  databaseURL: "https://estudio-diez-streaming.firebaseio.com",
  projectId: "estudio-diez-streaming",
  storageBucket: "estudio-diez-streaming.appspot.com",
  messagingSenderId: "599746842056",
  appId: "1:599746842056:web:c3f8b8c2726b336b55c4fd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const email = user.email;

    // registro usuario con nombre y apellido
    async function checkDataUID() {
      const existUID = doc(db, "users", uid);
      const existName = await getDoc(existUID);


      // Greet process
      var myDate = new Date();
      var hrs = myDate.getHours();
      var greet;
      if (hrs < 12) greet = "Buenos días";
      else if (hrs >= 12 && hrs <= 17) greet = "Buenas tardes";
      else if (hrs >= 17 && hrs <= 24) greet = "Buenas noches";
      try {
        document.getElementById("loged").innerHTML =
          greet +
          " " +
          existName.data().nombre +
          " " +
          existName.data().apellido;

        const existCert = onSnapshot(doc(db, "users", uid), (doc) => {
        let certi = doc.data().certificado;
        if (!certi) {
          $("#certAsis").prop("hidden", true);
        } else {
          $("#certAsis").prop("hidden", false);
        }})
      } catch (error) {
        console.log(error);
      }

      // Chequeo certificado moratoria
      /* async function checkCertMoratoria () {
                  
        const existCert = doc(db, "users", uid);
        const existCons = await getDoc(existCert);
        let certi = existCons.data().certificado;
        if (!certi) {
          $("#certVisAsis").prop("hidden", true);
        } else {
          $("#certVisAsis").prop("hidden", false);
        }
      }

      // Chequeo campos moratoria
            let existMoratoria = onSnapshot(doc(db, "users", uid), (doc) => {
              let showMoratoria = doc.data().moratoria;
              if (showMoratoria === 0) {
                $("#moratoriaOk").prop("hidden", true);
              } else if (showMoratoria === 1) {
                $("#moratoriaOk").prop("hidden", false);
                checkCertMoratoria();
              } else if (showMoratoria === 2) {
                $("#moratoriaOk").prop("hidden", false);
                checkCertMoratoria();
              } else {
                $("#moratoriaOk").prop("hidden", false);
              }
            }); */

    }

    checkDataUID();

    $("#certAsis").on("click", async function () {
      const existCert = doc(db, "users", uid);
      const existCons = await getDoc(existCert);
      let certi = existCons.data().certificado;
      if (existCons.data().Descargado > 0) {
        let clicks = existCons.data().Descargado;
        await setDoc(
          doc(db, "users", uid),
          {
            Descargado: clicks + 1,
          },
          { merge: true }
        );
      } else {
        await setDoc(
          doc(db, "users", uid),
          {
            Descargado: 1,
          },
          { merge: true }
        );
      }
      window.open(certi, "");
    });

    // signout process
    document
      .getElementById("signOut")
      .addEventListener("click", function (event) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          });
      });
  } else {
    window.location.href = "suscriptores.html";
    // User is signed out
  }
});

function verNovedades() {
  let year = document.getElementById("year").value;
  let mes = document.getElementById("mes").value;
  let mesYear = mes + year;
  let verNovedadesValue = novedadesImpositivas[mesYear].link;
  let verNovedadesPublic = novedadesImpositivas[mesYear].public;
  window.open(verNovedadesValue, "");
}

function verMaterial() {
  let year = document.getElementById("year").value;
  let mes = document.getElementById("mes").value;
  let mesYear = mes + year;
  let verMaterialValue = novedadesImpositivas[mesYear].material;
  window.open(verMaterialValue, "");
}

function cargaInicio() {
  $("#gmp").prop("hidden", true);
  $("#bienesPersonales").prop("hidden", true);
  $("#monotributo").prop("hidden", true);
}

cargaInicio();

let novedadesImpositivas = {
  enero2026: {
    link: "https://docs.google.com/document/d/1OXDwE27jZuiTa5I3ZWJdsEtKRIw2SuOWc6GcOVLZuoo/edit?usp=sharing",
    material: "no",
    public: "si",
  },
  febrero2026: {
    link: "https://docs.google.com/document/d/11A_XZPmfNBfv4f1BlXEaMfKOFyUbNhPbVufNvxGMVKU/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  marzo2026: {
    link: "https://docs.google.com/document/d/1_b7xOwkGWHBZyTtnaNC3U2--LlxhpwxTuycWRvYG_fY/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  abril2026: {
    link: "https://docs.google.com/document/d/1YdLl1c6FXxr5KuEMe00h6V-PMRN9CdY9r0EhTMWfX7g/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  mayo2026: {
    link: "https://docs.google.com/document/d/1JOcKSqqPhLA0c5a3dZ6UPjQJZuJaSK4S1ec-j2aLg3A/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  junio2026: {
    link: "https://docs.google.com/document/d/1GMHNcLty-xLtO0EUJwKK8D7WG4W2VZSQm7GFpPOrMu0/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  julio2026: {
    link: "https://docs.google.com/document/d/1klBv_DBBmc64V05sXiTfKJD8a9VWgMlvFObc40HAaS0/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  agosto2026: {
    link: "https://docs.google.com/document/d/10mcNndkqN0u3qfYKA2bDA1MwTCdHakKxkZCZoYlGiPU/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  septiembre2026: {
    link: "https://docs.google.com/document/d/16dVVkDiKVWBF-nqDm2lviZVYk7ci-Dw65MxR6BlmRG0/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  octubre2026: {
    link: "https://docs.google.com/document/d/1HNvK6HysgT_l5iC5dEq2g6yMsUfyQweaOplOSEYZGzE/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  noviembre2026: {
    link: "https://docs.google.com/document/d/1u79yJzabfZlt1JtfOjroJ-278-FHyzIItXvvQZte8Mk/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  diciembre2026: {
    link: "https://docs.google.com/document/d/1i7CWZvPOvj5QtzwS2kFTzWBAWrZYbeAL4QPq7DHx_8A/edit?usp=sharing",
    material: "no",
    public: "no",
  },
  enero2025: {
    link: "https://docs.google.com/document/d/1VoINLRZnxKUCrhCJoJbirvq3lN-RQrokyRciKKNiCtk/edit?usp=sharing",
    material: "no",
    public: "si",
  },
  febrero2025: {
    link: "https://docs.google.com/document/d/15MzI-tcZyRXwgicMFONcPi0JTo5nfkRZ7EoXulFDmu8/edit?usp=sharing",
    material: "no",
    public: "si",
  },
  marzo2025: {
    link: "https://docs.google.com/document/d/19MloTXkjUfF4jrvkGU8y7exrlrTltKxtSWmNkJFlfx8/edit?usp=sharing",
    material: "https://www.dropbox.com/scl/fo/m7zbsejhd07lofdg65y6g/AGBhjXtqrWHDOtZOsGKVgv4?rlkey=vvwytq7kwkkqzilelbz5q5rbc&e=1&st=yg4kf8fq&dl=0",
    public: "si",
  },
  abril2025: {
    link: "https://docs.google.com/document/d/1uJHGlv1E-l38mNX_rl44DI7qwQBQBzQnpViqUwg90f4/edit?usp=sharing",
    material: "https://www.dropbox.com/scl/fo/2b0p5ybwsifpvfkqg7lpf/AK-P0173kli65Yk4uNiAEeA?rlkey=huhby3fjptdwawgz0ruvxx5cs&st=mzxxksc8&dl=0",
    public: "si",
  },
  mayo2025: {
    link: "https://docs.google.com/document/d/1RMIVQbpZlsLG0aZ7PAZ7HEs8K1sdB2XQvvmy0z_j8Ns/edit?usp=sharing",
    material: "https://www.dropbox.com/scl/fo/sm050qn77nxnzdajzq8gz/AK6WZkLO488t8X03oEoBVns?rlkey=vk74kw2mplxb1egmpvwjmn08k&st=1xk7x0tf&dl=0",
    public: "si",
  },
  junio2025: {
    link: "https://docs.google.com/document/d/13aef9XbstLNmJT4CPewKYMyyJAfA6IkefmOnlav7yjY/edit?usp=sharing",
    material: "no",
    public: "si",
  },
  julio2025: {
    link: "https://docs.google.com/document/d/1Qb9coSKcfxUUEJskanH-Wl42-b7jeVa7EeHmzKbrw2o/edit?usp=sharing",
    material: "https://www.dropbox.com/scl/fo/wxovqpyo2b063psy9cjzr/AGZxEXNtFPnDhmNo04-rVcg?rlkey=l5l5zzw0385cog0fq38t6vkfo&st=6ji2mzih&dl=0",
    public: "si",
  },
  agosto2025: {
    link: "https://docs.google.com/document/d/1PvgKh9txJXXqs3qDQeu_iC0-YMVlqE8naklK646biv4/edit?usp=sharing",
    material: "https://www.dropbox.com/scl/fo/pkty1h65f0f31vijy6mic/ALvVYWqmNLu1yaQU2pHLTe0?rlkey=bn1pz9cc85l35c2clxsid8nhk&st=75p10eqb&dl=0no",
    public: "si",
  },
  septiembre2025: {
    link: "https://docs.google.com/document/d/1sWgCwwBWEx7t3mw9jDWWa_lXFnzFhEimONKqvqXt8UE/edit?usp=sharing",
    material: "no",
    public: "si",
  },
  octubre2025: {
    link: "https://docs.google.com/document/d/1O5p5-WEA9n-gbW3flrR1n-qla4bm-nLIjWPqMLvPmro/edit?usp=sharing",
    material: "https://www.dropbox.com/scl/fo/2org5ipts9pqn8fyl1u9f/AKHnnTVG25F0cjeVx3D-Et4?rlkey=8p0yzthl9suyho4o52e2zuv3d&st=vi3jki2w&dl=0",
    public: "si",
  },
  noviembre2025: {
    link: "https://docs.google.com/document/d/15MGV5ir3KgWCqXlAzvOZFh6oscnflRwQLLXry3i0sz0/edit?usp=sharing",
    material: "https://www.dropbox.com/scl/fo/hmye3hhw85wdl9qa6hk3f/AK2lg_WUpqn1dHd1VlLUM04?rlkey=kjlngjfav98merk4kak5le3rz&st=6x8xpkou&dl=0",
    public: "si",
  },
  diciembre2025: {
    link: "https://docs.google.com/document/d/18Asr1iKNOzAjEZkt1Tm6Ox8rsZbUA1ozVo63u5toBhY/edit?usp=sharing",
    material: "no",
    public: "si",
  },
  enero2024: {
    link: "https://docs.google.com/document/d/1OxaS-VK5EFfuauN3Sk_V1diU0E6kGFSIzLwUV2gITg0/edit",
    material: "no",
    public: "si",
  },
  febrero2024: {
    link: "https://docs.google.com/document/d/1S91-hSezLMwK7anmsqHrN6xliyZnLmIZCZ6iEAroK0w/edit",
    material: "no",
    public: "si",
  },
  marzo2024: {
    link: "https://docs.google.com/document/d/1EaVJC18NFvXxZN7Ikqjh-vwFUvJVxv4PtAuHmfUX6aI/edit",
    material:
      "https://www.dropbox.com/scl/fo/m6b495cb3g1xn0z1yuztj/h?rlkey=4bnpm7xzmikjqmx5y5t7p42y1&dl=0",
    public: "si",
  },
  abril2024: {
    link: "https://docs.google.com/document/d/14TQmEB-aD0Q41ztcpowFxS6zMWvCSIyAlHXeHQng9SQ/edit",
    material:
      "https://www.dropbox.com/scl/fo/noc9entgdyy9dl11zcsib/AAqhuaWKlth_Gv8Or2kvPdw?rlkey=ryncry6zkb48woye9rkrbcg6d&dl=0",
    public: "si",
  },
  mayo2024: {
    link: "https://docs.google.com/document/d/1y3wXpuxv9F_oxd9Hn4TMc6DBoQXlz1wXQg04A1nDzOI/edit",
    material:
      "https://www.dropbox.com/scl/fo/vzupiyluxkttmhvdazkpe/AKzcX6-zg2ABEfwepRwF9So?rlkey=1hpbrv47hezac1a3d05kqkul2&st=k7dxumff&dl=0",
    public: "si",
  },
  junio2024: {
    link: "https://docs.google.com/document/d/1_w_lwiqpFcX6p2GrISnstO-pHQcecCkIEBXqxkGc7p0/edit",
    material:
      "https://www.dropbox.com/scl/fo/u30ap7mhxuabpxguas2ph/AB2tWPhM0CBM9oa4nK5l1lw?rlkey=r43dlh53uhut1ll8qf5lqxr7d&st=bzfusgn6&dl=0",
    public: "si",
  },
  julio2024: {
    link: "https://docs.google.com/document/d/1mXuD-SliqgvXwsDt-XWeCldVI4x7IaA1WRgBl6NWuFE/edit",
    material:
      "https://www.dropbox.com/scl/fo/22qirhrs5r0hc8l01lgtt/ABmRuU6rxoRUKNn1qWir2q0?rlkey=83wnyilvvfmhbkvts2iyuaxg1&st=tra7mqbe&dl=0",
    public: "si",
  },
  agosto2024: {
    link: "https://docs.google.com/document/d/1yVF8zaaVTm8XsHofNfhqG8t3hU_sPjzxakCmWTiobSg/edit",
    material: "no",
    public: "si",
  },
  septiembre2024: {
    link: "https://docs.google.com/document/d/1amLgRJomIbLQLXiULdI84ZlAi0yyUatXmKIWknyU5so/edit",
    material: "https://www.dropbox.com/scl/fo/h1jfp8gvzlnky9t43iheh/AHya5flqkDo1lEU5E3pM3bc?rlkey=90gmifgrug2buqxfdmt44726j&st=hxdir4rj&dl=0",
    public: "si",
  },
  octubre2024: {
    link: "https://docs.google.com/document/d/1WZTxL7WJlFu9pvu2c08n5NxirJ1pzy6c1TW7UGMyh0Q/edit",
    material: "https://www.dropbox.com/scl/fo/c05ney1zatueravoms22a/AOIrG6qkBBZ43xpyOdpEgV8?rlkey=9iui2m4vkkyg0470cha8ldzzj&st=cwi7u0oy&dl=0",
    public: "si",
  },
  noviembre2024: {
    link: "https://docs.google.com/document/d/1DtFWu4YNXm2xbyQoOwcAsbDfTSHhQ9uMYz-pQNX-0y8/edit",
    material: "https://www.dropbox.com/scl/fo/huhweww56edr1iyuy6ulr/AP8AKbgkvcbB8qTFzVmpNFM?rlkey=y6586i3zr6om75h7hm5i2g4jt&st=b8t7tarp&dl=0",
    public: "si",
  },
  diciembre2024: {
    link: "https://docs.google.com/document/d/1Aia_gsLqE-pFYcYSmOyoj9vDH3v7da2H-cKtCW_lsIU/edit",
    material: "no",
    public: "si",
  },
  enero2023: {
    link: "https://docs.google.com/document/d/1UbObPtG9z9HS3h9oQTKzVz179NoHJQhbcGm_1GHTTsk/edit",
    material: "no",
    public: "si",
  },
  febrero2023: {
    link: "https://docs.google.com/document/d/1RU7wVt951B4boAmt8aZwSlvoRuiQuutmyCajFebOowY/edit",
    material: "no",
    public: "si",
  },
  marzo2023: {
    link: "https://docs.google.com/document/d/1zxRMqNeT8aUfHWgJDItOLL5VoaILNcr2sIPw2ZNOFe0/edit",
    material:
      "https://www.dropbox.com/s/io2j7xvrhdbd9dp/ED%20-%20Material%20Marzo%202023.pdf?dl=0",
    public: "si",
  },
  abril2023: {
    link: "https://docs.google.com/document/d/17nw4n5m-CJ5_s3AJMzY9mejYr5n-DaIkIwyICPIgXHw/edit",
    material:
      "https://www.dropbox.com/sh/8hkknad2x84qd38/AACkJvaUl3xIcY36H_0wtNMEa?dl=0",
    public: "si",
  },
  mayo2023: {
    link: "https://docs.google.com/document/d/1IIIU_kSiga4ElbPmgMMAGYw7T2InsjZEEu7K_5oiGjg/edit",
    material:
      "https://www.dropbox.com/sh/byqynqditej3r9q/AABN-CsAC9lq1SZ-c1U-QwOHa?dl=0",
    public: "si",
  },
  junio2023: {
    link: "https://docs.google.com/document/d/14xHpmebowSTMpmoh6UN8jdV_smkUYozJ2EGIoF-lgRA/edit",
    material: "no",
    public: "si",
  },
  julio2023: {
    link: "https://docs.google.com/document/d/128oz3CdUiFEqgXp7FPG094r0iImPAzYESjOPdXnKREI/edit",
    material:
      "https://www.dropbox.com/sh/7dxvrh1gsfqmi95/AABf9laKLkUdzQ7YG5RfWwUJa?dl=0",
    public: "si",
  },
  agosto2023: {
    link: "https://docs.google.com/document/d/1nq9tOAq-xd1cTkJ4eRH672I-njU04PaPku5DuVfhW2A/edit",
    material:
      "https://www.dropbox.com/sh/7i1honrz2jnu9o8/AABbZi0uLQP0nQn-5LIJKlxYa?dl=0",
    public: "si",
  },
  septiembre2023: {
    link: "https://docs.google.com/document/d/1lt8BqIA6ZQ0bf9M_FVfpGToBAIMEuPOFFPMkGf6xI0g/edit",
    material: "no",
    public: "si",
  },
  octubre2023: {
    link: "https://docs.google.com/document/d/1-S1fJ8StwfxFAKM1o-vjcqBzyV52fxiECgYl2fOz2iI/edit",
    material:
      "https://www.dropbox.com/scl/fo/pgpr9g73l849mxcmxai72/h?rlkey=ape57mrq0rv28nrj2w40ps0su&dl=0",
    public: "si",
  },
  noviembre2023: {
    link: "https://docs.google.com/document/d/1REl9iPTT_sV6blBlDVLxiBo0yvbamNxX1LzLbY9kc6s/edit",
    material:
      "https://www.dropbox.com/scl/fo/01v8oejdz660eczp89x1b/h?rlkey=epckxt8r6jawmiq40xwll87jc&dl=0",
    public: "si",
  },
  diciembre2023: {
    link: "https://docs.google.com/document/d/1Cq7imYxuy9DAQwDnALPIppNmKVy501dzs45TMb48pcw/edit",
    material: "no",
    public: "si",
  },
  enero2022: {
    link: "https://docs.google.com/document/d/1z1MWLqd__9w3Ouydt55wYr4MwGR2ww7CyNtN2i_AlM0/edit",
    material: "no",
    public: "si",
  },
  febrero2022: {
    link: "https://docs.google.com/document/d/1TGGxRrKfLcfs8WVvqCsocfi6wfNJUNlZ98_3q5UKWtY/edit",
    material: "no",
    public: "si",
  },
  marzo2022: {
    link: "https://docs.google.com/document/d/1Zf7TUWQ1yn8mmQugP4etuzG3RPQnsizZ38tFvvRpJpU/edit",
    material:
      "https://www.dropbox.com/sh/sfzhuzkh2pqlk58/AAC4vKwyHXkE-7bINZ1zK7A-a?dl=0",
    public: "si",
  },
  abril2022: {
    link: "https://docs.google.com/document/d/1VOD-xKHaqQtRAU_dZEPpTGxfQsghNBHje4Tq1Bo4c-M/edit",
    material: "no",
    public: "si",
  },
  mayo2022: {
    link: "https://docs.google.com/document/d/1l_A19Cjs2ZG6YcUQs_2BZErXxa3SZ4SgiCWBdKhfZfo/edit",
    material:
      "https://www.dropbox.com/sh/oqgt1zv5f54diee/AABsnrLBSf2-2csiEEM1YlNza?dl=0",
    public: "si",
  },
  junio2022: {
    link: "https://docs.google.com/document/d/1asmcEL_idn1RZXXPoJlQw5zK7-pj43gwhlsEB90PNlI/edit",
    material: "no",
    public: "si",
  },
  julio2022: {
    link: "https://docs.google.com/document/d/1WeEH51oO6nZYb_O71ZKJu87oYgLqaN8RBvXxCEvFA3A/edit",
    material:
      "https://www.dropbox.com/sh/f3rz6jhy65fc9it/AADymM3Jo4j9ep0PlwiL8SFsa?dl=0",
    public: "si",
  },
  agosto2022: {
    link: "https://docs.google.com/document/d/1DZMoF0DvPstC6ZA64CUuI_i6mwBztKcV8rAgPYwsZpc/edit",
    material:
      "https://www.dropbox.com/sh/xt9vt9xy6tkvi1l/AADOHEAo_egP1b8kBMzIsxFTa?dl=0",
    public: "si",
  },
  septiembre2022: {
    link: "https://docs.google.com/document/d/1GDmr6PQO-hvy1yoJ30RKtJu0UEvqUKEIhyLuaVTvFO8/edit",
    material: "no",
    public: "si",
  },
  octubre2022: {
    link: "https://docs.google.com/document/d/1rD_nH0KBFCAE5mx1j3eUEPDPDeuilRYJhEmvBC1KgyM/edit",
    material:
      "https://www.dropbox.com/sh/dpxv6ybi2u9egx3/AABkFajU6aFtGCL3AT9hLY_ea?dl=0",
    public: "si",
  },
  noviembre2022: {
    link: "https://docs.google.com/document/d/1X3_rkqreXun31j1PFlkcMlmqqnU73SPKfosmL8VMEhs/edit",
    material:
      "https://www.dropbox.com/scl/fo/iaydu6nm1v6ec0kqszc26/h?rlkey=fxpap3ccx5hf7tt75ve9k9bmq&dl=0",
    public: "si",
  },
  diciembre2022: {
    link: "https://docs.google.com/document/d/1rGqaqRmxBN4Tto_OQn44ZdPeH9qwrHLqErhbR5F_R1I/edit",
    material: "no",
    public: "si",
  },
  enero2021: {
    link: "https://docs.google.com/document/d/1l6Raq8Q03d7MEStBL1Qnv5u5bjdqIBzx4WHNOLCEcCA/edit",
    material: "no",
    public: "si",
  },
  febrero2021: {
    link: "https://docs.google.com/document/d/1Tlk0zmv3DHC0LsBMBXdbWl1ismcAXJYcTsyt9LCL0pE/edit",
    material: "no",
    public: "si",
  },
  marzo2021: {
    link: "https://docs.google.com/document/d/1VgGcT2SHsAYpvlYo6tdVLx6nwtI3yPonPXVVqOoqM-c/edit",
    material:
      "https://www.dropbox.com/sh/jn4g9nawtfu9zn2/AAAFaCwAw5gr6xHbiGCFVRACa?dl=0",
    public: "si",
  },
  abril2021: {
    link: "https://docs.google.com/document/d/1Sgnw1N0kYU299joQfyP_r3P2QuUMD31e4vUII5Agqvk/edit",
    material:
      "https://www.dropbox.com/sh/1tkuypbnhisqbyj/AAAWiCrNYGe5tMiwlDS-rH5Ma?dl=0",
    public: "si",
  },
  mayo2021: {
    link: "https://docs.google.com/document/d/1uHc4l9xgIuML-Qthie5PXxAFDTbv-t_rNN90uyqyEEI/edit",
    material:
      "https://www.dropbox.com/sh/ptr5ud6jdrwfogc/AABtoe7hEvfanS6AAf74Uua1a?dl=0",
    public: "si",
  },
  junio2021: {
    link: "https://docs.google.com/document/d/1pv7eg75WW8HsZyLJEhd0tCnbeLr-afXZUcyxZuhO0zk/edit",
    material:
      "https://www.dropbox.com/s/ooo39av9cofpo7h/ED%20-%20Monotributo%202021.pdf?dl=0",
    public: "si",
  },
  julio2021: {
    link: "https://docs.google.com/document/d/1jWW15pfC2hC7JCc0FXDNMzEOkA5Wt9uuUsTEW1l-kcU/edit",
    material:
      "https://www.dropbox.com/sh/f93hru5w8qdmx1j/AADOIOZabNsmSkAcWFPJ3Z5Ha?dl=0",
    public: "si",
  },
  agosto2021: {
    link: "https://docs.google.com/document/d/1CkkKqlbg3UEfoCP9xl53RzDQfZ0uNlIUsGb9GHK_fJo/edit",
    material:
      "https://www.dropbox.com/s/t93dh5sa3b348mh/ED%20-%20Ciclo%20de%20Actualizacion%20-%20Agosto%202021.pdf?dl=0",
    public: "si",
  },
  septiembre2021: {
    link: "https://docs.google.com/document/d/11D1VirEv7exjX1EVeJ40WmaVqW8qtOh0yRpguRhS4kQ/edit",
    material: "no",
    public: "si",
  },
  octubre2021: {
    link: "https://docs.google.com/document/d/1h3YNY_ylXum7tPzm_RQLedM3P3mMRQelyxF_CQt_KaQ/edit",
    material:
      "https://www.dropbox.com/sh/klyptdsc3uvw98j/AADr9MfeedIJFEXtHcrmb8S5a?dl=0",
    public: "si",
  },
  noviembre2021: {
    link: "https://docs.google.com/document/d/1aSwMX7GCfBq5rooauAoCCEBn2BrYvuqMZAs1-HaJ6II/edit",
    material:
      "https://www.dropbox.com/sh/y310njqcuxb0w5n/AAD8ic0Hc0-B4R0XncyECJsQa?dl=0",
    public: "si",
  },
  diciembre2021: {
    link: "https://docs.google.com/document/d/1nhdPD021tYnDCbB7CqPchNqhpwA0DdB6z4Lag8h6IEc/edit",
    material: "no",
    public: "si",
  },
  enero2020: {
    link: "https://docs.google.com/document/d/1UodyRLvXL_j6BwDpT_58SXX-8Zx7VBb45Q3kjqbnaq4/edit",
    material: "no",
    public: "si",
  },
  febrero2020: {
    link: "https://docs.google.com/document/d/1LVPq8ZP3fIiyHwRICXZ2CrWi97Ix-rSe_VkSmz6JeH0/edit",
    material: "no",
    public: "si",
  },
  marzo2020: {
    link: "https://docs.google.com/document/d/1a1_ZaTc-1becrQ1fn0Py2wCc9F8DyGP3YT39OkBRda8/edit",
    material:
      "https://www.dropbox.com/sh/6izeiemc7mey158/AAB_fHGXL4TS4FIm5b7hbuqga?dl=0",
    public: "si",
  },
  abril2020: {
    link: "https://docs.google.com/document/d/1FlkXCKynH1gbPwPujFL4xxaPxa8GuaX1tEW05LWPnoE/edit",
    material:
      "https://www.dropbox.com/sh/ojjmzlgbt3v1s9m/AAD1sqyNoy-RpVFMqpIvdJ_Wa?dl=0",
    public: "si",
  },
  mayo2020: {
    link: "https://docs.google.com/document/d/1M_eY7f-4__i6_SmDiBHilF4jLePj6XnAJvZc0Mug8BE/edit",
    material:
      "https://www.dropbox.com/sh/dlgwy6whs7v6zye/AABomnnJOO5ryamieYLNeLD4a?dl=0",
    public: "si",
  },
  junio2020: {
    link: "https://docs.google.com/document/d/15l5T1NbLFzOrvCNirCrveYME5PQAV_n0WLb5ayEdD0E/edit",
    material: "no",
    public: "si",
  },
  julio2020: {
    link: "https://docs.google.com/document/d/1Spx-3vxpbXggZACszpW_6WEiCKiZg32Co388SbP9MM4/edit",
    material:
      "https://www.dropbox.com/sh/r9lgwbpviykot9x/AABwFzOzH8y13-XTM635qpZYa?dl=0",
    public: "si",
  },
  agosto2020: {
    link: "https://docs.google.com/document/d/1kv60Wl1dbYLLVDcCM2mPVld4qRTLZz21MjsZYxzrMD8/edit",
    material:
      "https://www.dropbox.com/sh/750r8n776guavur/AACC74ycxRKpY3O2h5tUV65xa?dl=0",
    public: "si",
  },
  septiembre2020: {
    link: "https://docs.google.com/document/d/1y37Lw4UiJXkOj4w5aA5llgNA9Yjw3JoI3Bcqnoukfys/edit",
    material: "no",
    public: "si",
  },
  octubre2020: {
    link: "https://docs.google.com/document/d/1qZAdbP7FBab4y04RjnQXHb6vKWzntBZ49gy0DIw4k88/edit",
    material:
      "https://www.dropbox.com/s/tjdolckx1r5kcjj/Moratoria%20Agosto%202020.pdf?dl=0",
    public: "si",
  },
  noviembre2020: {
    link: "https://docs.google.com/document/d/14J9MHnsGEaLG5mSOYu3pc20iJMwN9xwrj_Ir104ud4I/edit",
    material:
      "https://www.dropbox.com/sh/23v9z81rae87r9j/AAA6eJgQddrFrQjo4dbtCA94a?dl=0",
    public: "si",
  },
  diciembre2020: {
    link: "https://docs.google.com/document/d/1MoolQ7xqzlNlIyRbYBOgbaGS53HMrWVtvyOmkcoIefc/edit",
    material: "no",
    public: "si",
  },
  enero2019: {
    link: "https://docs.google.com/document/d/1RpmlXNuAvmwhZbjFYBMhklqHKx8Gqc0B1d6wpZ7ygUU/edit",
    material: "no",
    public: "si",
  },
  febrero2019: {
    link: "https://docs.google.com/document/d/1jkIG42MYButnf-YRrtb7UIWb6GOf9nNX1yUpqiHdupA/edit",
    material: "no",
    public: "si",
  },
  marzo2019: {
    link: "https://docs.google.com/document/d/1LKDaURuLTFhwyKP-0CU76tukvvcTjtsb5FjYq9j1w3g/edit",
    material: "no",
    public: "si",
  },
  abril2019: {
    link: "https://docs.google.com/document/d/1r2mI3ldMy6wT2BpA3hnb_FX0rFmKttly1GJWbY_J9qw/edit",
    material: "no",
    public: "si",
  },
  mayo2019: {
    link: "https://docs.google.com/document/d/1oXoORv2JHiCdEnK1k4Swvc0ILjgxTaHe3fkIZnzqJlI/edit",
    material:
      "https://drive.google.com/file/d/1HhSSnvFlxPWzjgBzHv_5vjwBtlE7R9U5/view?usp=sharing",
    public: "si",
  },
  junio2019: {
    link: "https://docs.google.com/document/d/1owz0mYiUw2ajehmJhrwIwWdFU9OSYxChZU7ngpii9RY/edit",
    material: "no",
    public: "si",
  },
  julio2019: {
    link: "https://docs.google.com/document/d/1nFbBidvYqSwk8vDjKbcoDp-93raDwbGMhtkCu_FHDfA/edit",
    material: "no",
    public: "si",
  },
  agosto2019: {
    link: "https://docs.google.com/document/d/1nslno2UKAjy1E3CoWAWWqzr9k2Vy-UEHhtocKjoM-Rw/edit",
    material:
      "https://drive.google.com/file/d/1_IkdmhIwxm7OZCcQv8-EdftOHWVXsh4G/view?usp=sharing",
    public: "si",
  },
  septiembre2019: {
    link: "https://docs.google.com/document/d/16kceXhVZU1xflOhyCPfhVHXz2DbObK-wB3cg2DHhxNw/edit",
    material: "no",
    public: "si",
  },
  octubre2019: {
    link: "https://docs.google.com/document/d/1LeTOwKdmCYZc3-pRekX2BUP5KY6-W3PToNYOb-88u98/edit",
    material:
      "https://www.dropbox.com/scl/fo/0gh233lc1xmebary5eell/h?rlkey=pw2dv2yspiwq0nuvl3vjiy7hi&dl=0",
    public: "si",
  },
  noviembre2019: {
    link: "https://docs.google.com/document/d/1IU-iljDNgV02BYLYcSL_SIcVbjEgToRw0nOTMbiyZm0/edit",
    material:
      "https://www.dropbox.com/scl/fo/wl4g0kbpe8dxrt5rj7mrm/h?rlkey=v8scp9uvv29mgn7ksxpnszwl5&dl=0",
    public: "si",
  },
  diciembre2019: {
    link: "https://docs.google.com/document/d/1qX09kfNsPXP7Y6Zr8GBQ-COx7CHYZ4GgqHnBknsElbM/edit",
    material: "no",
    public: "si",
  },
  enero2018: {
    link: "https://docs.google.com/document/d/1Ug9_tKjuRz50FDHPvy8fr3YtliNaspc9KmV-gt_97xY/edit",
    material: "no",
    public: "si",
  },
  febrero2018: {
    link: "https://docs.google.com/document/d/1bYrAtcY9ZqE-PuMW39TE4zHEk81vWxXBpZhdEYpRDug/edit",
    material: "no",
    public: "si",
  },
  marzo2018: {
    link: "https://docs.google.com/document/d/1nCM0yZUHLXMQ5hCIUGCZUVpuOcxKgGiSXpk7gODjXdM/edit",
    material: "no",
    public: "si",
  },
  abril2018: {
    link: "https://docs.google.com/document/d/1pVgKI4lbHGw7jn5r4cPNUJy1o0BsoNX13gBJqI8wAK8/edit",
    material: "no",
    public: "si",
  },
  mayo2018: {
    link: "https://docs.google.com/document/d/1ZG1jghyu3rq25zBOIW9JtUtvvx2Wyd7MT2p6Kps0RnQ/edit",
    material: "no",
    public: "si",
  },
  junio2018: {
    link: "https://docs.google.com/document/d/1rTEMxnfX5aZdrXhIGM5pABxEiK9n08YbMtRSvgrkMBg/edit",
    material: "no",
    public: "si",
  },
  julio2018: {
    link: "https://docs.google.com/document/d/15driaYt1hgKDo2iKTJjdqpJhBBPQKoxPHriPUgwTJm4/edit",
    material: "no",
    public: "si",
  },
  agosto2018: {
    link: "https://docs.google.com/document/d/1ThH0_Q5OU3nAZ2kwsjEkRxCRoJf8UiylBtEBfgpXF7I/edit",
    material: "no",
    public: "si",
  },
  septiembre2018: {
    link: "https://docs.google.com/document/d/1wq9pLRYvf07hxrIEIeAv7L_706mSrOUtndUEQl9sev4/edit",
    material: "no",
    public: "si",
  },
  octubre2018: {
    link: "https://docs.google.com/document/d/1iEoVpeVm1Fw4G-Gp3QFnX3ZJYbsvNZSjxuufDfXWLd0/edit",
    material: "no",
    public: "si",
  },
  noviembre2018: {
    link: "https://docs.google.com/document/d/1F8EIdT_-0fwPHPX0kNB9tB26PEHaozj3zkyi4PCmBQQ/edit",
    material: "no",
    public: "si",
  },
  diciembre2018: {
    link: "https://docs.google.com/document/d/1BbM3fCJQepmfDxQ3luieSNs43n7h7t8j00wCQOoyXT0/edit",
    material: "no",
    public: "si",
  },
  enero2017: {
    link: "https://docs.google.com/document/d/1AF0JjEb55veoK7F4bPuwHNmqxEseMmsT8w9iqlz-vBg/edit",
    material: "no",
    public: "si",
  },
  febrero2017: {
    link: "https://docs.google.com/document/d/1E86B7Xar2Gp0cCVV6tb1gENBCtZSbyFpOBh-OQugWqA/edit",
    material: "no",
    public: "si",
  },
  marzo2017: {
    link: "https://docs.google.com/document/d/1t1NHmx2wP167ZEeqUvHj0IQassQyOQ5E6UdHbJu59NY/edit",
    material: "no",
    public: "si",
  },
  abril2017: {
    link: "https://docs.google.com/document/d/11kX37UIcRV9FwQ5iqAYS9n-a3lzf1sb70qNr3y3nijc/edit",
    material: "no",
    public: "si",
  },
  mayo2017: {
    link: "https://docs.google.com/document/d/1_JqKTmQOCVvKdV1ab14ZZ69BEFUh3sNCGPYYAhiTEkY/edit",
    material: "no",
    public: "si",
  },
  junio2017: {
    link: "https://docs.google.com/document/d/1xuZl5MT_1a0omicXaO6ppWMkdsuN_TE1x3jJeYmSE7Q/edit",
    material: "no",
    public: "si",
  },
  julio2017: {
    link: "https://docs.google.com/document/d/18FMjw-Sh0u5KSQI7w-fes-kHFTQWhpHRlrL7BoR_2VI/edit",
    material: "no",
    public: "si",
  },
  agosto2017: {
    link: "https://docs.google.com/document/d/10CCyYpdPiWVyxIw45g0HUkjeAorT3NCI-UQ6hn9G97U/edit",
    material: "no",
    public: "si",
  },
  septiembre2017: {
    link: "https://docs.google.com/document/d/1hF5y6uuoNYJBDPlVmGMOYk37OJae4TwwxfnYk_qh28E/edit",
    material: "no",
    public: "si",
  },
  octubre2017: {
    link: "https://docs.google.com/document/d/1sGtGGmQJiVaaoSAXJWNRfRkYnv_4YJcROU7pNEku9AQ/edit",
    material: "no",
    public: "si",
  },
  noviembre2017: {
    link: "https://docs.google.com/document/d/1yAJZUTTtyjZFKJthAoUbvg2nOQ-iTNy8SizDttKu4BM/edit",
    material: "no",
    public: "si",
  },
  diciembre2017: {
    link: "https://docs.google.com/document/d/1S47pSgIMm_jXiY4kYIAIStomoKhx_Tow00Cs47ICBr0/edit",
    material: "no",
    public: "si",
  },
  reformaTributaria: {
    Div1: "https://docs.google.com/document/d/1T7e76xqXckqAHgkKWkPqMfLgNFZmjWU1OBR2k6GRvqs/edit",
    Div2: "https://docs.google.com/document/d/1F3StkpPt9QgVNxflTxds3ngbscdByVKZatLriqL2MQs/edit",
    Div3: "https://docs.google.com/document/d/1QlVAC_G4Els7tEFf0xt6Li1pcOj0WWvHEUtR-vm4V0Q/edit",
    Div4: "https://docs.google.com/document/d/1-eJrPsxmSbN6CiSYKE0GBld_3dzxiXrJme0ia6TfD6U/edit",
    Div5: "https://docs.google.com/document/d/1MBHdjpuniJ1GV8GQf9A8ovaJfHJyfgSSMHpJjEYjtGc/edit",
    Div6: "https://docs.google.com/document/d/1IKdfZrYgXATb1TvUWJruZa3IJ1TlVt65FFOCWiUshwU/edit",
    Div7: "https://docs.google.com/document/d/1-hHwfMnjXt-AdStC3Jbz1MKeGlYOHYYV8Oqv_tnD77A/edit",
    Div8: "https://docs.google.com/document/d/14W27odiDnVVhOEAEWbR54nXRcRbe3HA2ch66aYYnlb8/edit",
    Div9: "https://docs.google.com/document/d/1-enDVyugyzlHY5VQRjfOCNFOTEUqGpHo64Hx7x_tM_w/edit",
  },
};

let impuestosNovedades = {
  year2026: {
    agipLink:
      "https://docs.google.com/document/d/1T2D72ivl8R829A4gB6fbuMyG_1v-2O0PsXaWLmo-KD0/edit?usp=sharing",
    arbaLink:
      "https://docs.google.com/document/d/151txMr6-6G1yjZ3xvDL1LsoT9JvYUN9jNdSzw89AR4s/edit?usp=sharing",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1X_grUYbPrQ8PowzRtU4Mjn4KuAud4kwEsCTCB7zawG4/edit?usp=sharing",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/11SnNk3eFePdQ5aEgJ5fgxtW-FUFSoYQmoWqfLgqa7Vk/edit?usp=sharing",
    deInteresLink:
      "https://docs.google.com/document/d/1z8tvbdOCgxn3zFMPJ3RjiZ7fyBQcEoj7d1mHeatoS70/edit?usp=sharing",
    gananciasLink:
      "https://docs.google.com/document/d/1jEA1EvKklLor6BJ-FtCnsRYUHWI0cBAkoKxpVaYDQiQ/edit?usp=sharing",
    gmpLink: "no",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1LK0t7QQWvwqbukAJQ4Oz8rW2H4gIwtr2lHbd-vTksDA/edit?usp=sharing",
    ivaLink:
      "https://docs.google.com/document/d/11hlggsBpfUtijN-X08bzVI6J9zNUgrG34Z4hMX1_mag/edit?usp=sharing",
    monotributoLink:
      "https://docs.google.com/document/d/1WX_XIz1w8cn37tCfpbD83_xlGwMHBifVuCU555QO5lM/edit?usp=sharing",
    previsionalLink:
      "https://docs.google.com/document/d/1JYZL6Jl_CtDr451CeQhuWCinIDmdUrbfR-FNas4EEpI/edit?usp=sharing",
    procedimientoLink:
      "https://docs.google.com/document/d/1UzreWzvtkK0ykQzPjjmhHIXXyIr3AB1SDT8udyro49Q/edit?usp=sharing",
  },
  year2025: {
    agipLink:
      "https://docs.google.com/document/d/1vRD0d5MRWbt-t-ywTsWoopxtw6pBAUo9867_Tf6c-30/edit?usp=sharing",
    arbaLink:
      "https://docs.google.com/document/d/1gx3494JAq98mnqQdoGYtIPq2Mb3t8y3hgFjSrNoHTv8/edit?usp=sharing",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1qZgMEbXa8dvGgjV6u457JdQsoISJLhntkjlTG94W180/edit?usp=sharing",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/17hrEBRvh1d9VZNIF5pCA4KUa1PyDLalk92Vg_4xW8wA/edit?usp=sharing",
    deInteresLink:
      "https://docs.google.com/document/d/1RGLrmujcIG1fk8xk9fYpFOmQbOcYu6XxRKyBXZCYQdU/edit?usp=sharing",
    gananciasLink:
      "https://docs.google.com/document/d/1aj9i8NFfNpjRnkwiMY_xj1d5a1TMQCFcfsI04bRtKdI/edit?usp=sharing",
    gmpLink: "no",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1XQtP-L_c0Cjdckjhbs3VtrhUMjuvDeuiJU2ccHKH9Ew/edit?usp=sharing",
    ivaLink:
      "https://docs.google.com/document/d/1U4PXGuZvelZMeBHi36zYtDaQCOxWthelmrCb3reURZg/edit?usp=sharing",
    monotributoLink:
      "https://docs.google.com/document/d/1t3lVFrjp-Rkv_DM409_wsphywFTnifzsY17k2hyttj4/edit?usp=sharing",
    previsionalLink:
      "https://docs.google.com/document/d/11xT_LBP-vj6PjbJlCusNfMwv-n75D3Sxe2Fg0LL0WOY/edit?usp=sharing",
    procedimientoLink:
      "https://docs.google.com/document/d/1BoErWl7UUOF05R2-lh53btDib5dx4udIie1C595I-ss/edit?usp=sharing",
  },
  year2024: {
    agipLink:
      "https://docs.google.com/document/d/1oNONUCkrYGHb3DsFki62JSGB5Knx8fIQCXN--SbTx6Y/edit",
    arbaLink:
      "https://docs.google.com/document/d/13nv7vONvoA1f_gyBhrhFWse10fGjHPJN55BktXstqFI/edit",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1j0TnyRp29szAkdkmhBX91Y075c6TZOKDFheO1cjqvf8/edit",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/1NPCwT_qIZ5ttqAr6zsx92gaN_Xtv2_ND0LtDmNX8yT8/edit",
    deInteresLink:
      "https://docs.google.com/document/d/1jgWcEUgNqkx2qUA5aGh2jyhJVrN87dwFBpUibUY2l4U/edit",
    gananciasLink:
      "https://docs.google.com/document/d/1NjXsCPKiMuEbZgdlxtnIsqWQiRQphL93t5P1IuXWosU/edit",
    gmpLink: "no",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1fnrqy9dTJ_NZ20i2VyaL3APltWeIo0aDwwBQyE-Xv0g/edit",
    ivaLink:
      "https://docs.google.com/document/d/1LR621FjkKulD2ajYgI2qIkJumx39al0NuWa4FawCWWM/edit",
    monotributoLink:
      "https://docs.google.com/document/d/1rII_84lzKqY9A35jnyEVDj4ajN9ZdlAqnrAQxL9Yx50/edit",
    previsionalLink:
      "https://docs.google.com/document/d/1P_lgoRLpX7lci_uEdnGFg7Opu75bn7iff6p5CpibxpE/edit",
    procedimientoLink:
      "https://docs.google.com/document/d/1OpSzbJwMO9XMoPli_nSdCK3JWfuluC5WMoBSEMpszkg/edit",
  },
  year2023: {
    agipLink:
      "https://docs.google.com/document/d/1a9BplIC2XxxGYbJTdrHFiR4bBpvlflygiBWgK-7bTRU/edit",
    arbaLink:
      "https://docs.google.com/document/d/16xDY4cGB1KHXDPePFitMrK9dNw3gYHJaYbv7YF1UPPY/edit",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1BYqxfaB76Tbvnpj3mjjfGhVFtT-ZsxoIrh_1MJP2p0Q/edit",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/1b80HvQ08ICRBBBUWZ5iy6KyjkBNXlpoRUMwSl6lHKZA/edit",
    deInteresLink:
      "https://docs.google.com/document/d/1EZmOxl6v0l0AZeXY-I_11FyQoc0Pet57vFBIjepFruI/edit",
    gananciasLink:
      "https://docs.google.com/document/d/1kKyivi7Zsi_Y4E30W1Cukm4sLLGHQ11ZbntFQVRC2yc/edit",
    gmpLink: "no",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1rTyYTdeP3DAyTjeNx7Wpv3lz0R5HpbCax9UiLSY7YDk/edit",
    ivaLink:
      "https://docs.google.com/document/d/1NtfS9trQ7wfnjIF6gDKCFMkk9Lb4yGaQvH665_I1dx4/edit",
    monotributoLink:
      "https://docs.google.com/document/d/11twJlBbmSIqDkQnXnJGx54G0euMuUO8eR24Nvq-FqA4/edit",
    previsionalLink:
      "https://docs.google.com/document/d/1A0DsTGh_q3O1nOQg4kRwbgV2s4hRnhETf7H8fWvuHzk/edit",
    procedimientoLink:
      "https://docs.google.com/document/d/1vnlidSzm_jekuh73XZhmR5_qw3yA_jcMqcAUwc9KCT8/edit",
  },
  year2022: {
    agipLink:
      "https://docs.google.com/document/d/17UgTvdpdB_SNfvUAywyJ4-TH--ONH9tvl_HPMxDtkRs/edit",
    arbaLink:
      "https://docs.google.com/document/d/1wN7QeKFPSARddEORgmkC58b6p2eERcHtjfI_oJ4oeqA/edit",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1e4JjOXR1-SHq1KDQqiFeEpHCKppiJZf4pV5YLrVB3ls/edit",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/1768tjM1DVrhGLAjR_uZUjcgXbh5cz6zzgryfxNrTyJM/edit",
    deInteresLink:
      "https://docs.google.com/document/d/10bvFaP0XOod0zvBKIENZ8l8zDGqf4EnwrnL52TtjsSI/edit",
    gananciasLink:
      "https://docs.google.com/document/d/12tHvPCAJ1D2IpFRdXntlfJw_iXI98P9RJ9rq7vf8_d0/edit",
    gmpLink: "no",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1Ugn6SRQS6Qp4tMb96GJaYgYfIJovq8Z5oYpLzQrzTZg/edit",
    ivaLink:
      "https://docs.google.com/document/d/1ILwZ_F_licuuoVQi-NzXYqrWDDHM5ABg6oxeKBViQgY/edit",
    monotributoLink:
      "https://docs.google.com/document/d/1v5cOdzh5tEgSM2ojbA-Lza7ArCJzyGbMjOGBU_Wb9eI/edit",
    previsionalLink:
      "https://docs.google.com/document/d/1nU5ipsDMQPj8sFp7WDEgREd0DHeCXq-KXwWMlOJ5UpM/edit",
    procedimientoLink:
      "https://docs.google.com/document/d/1eJC5jy2Fjfp02wH76fqZ7io2l-niL1EgQVXG8FCsNcY/edit",
  },
  year2021: {
    agipLink:
      "https://docs.google.com/document/d/17g-5gNU63HqxnlxzbGYLXdJyMEc3O-vUJqL3zc5tOcM/edit",
    arbaLink:
      "https://docs.google.com/document/d/1tSSLRAmZNMwvrHffKNvlbrC-MXNlZG-aSDjwQGSGWVA/edit",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1JbXINmnz-SM_6S4S5YSPQCcv8S_Ele4wLeRUhGj4Szk/edit",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/1iKO7uPJgZ41c1SxSWxfP4vJjcQ3hvem1xpJes9bSN-E/edit",
    deInteresLink:
      "https://docs.google.com/document/d/1fditQ3NQUNQbdFmFw-7R9rd19DBWLbvzs-JaqKxOJ58/edit",
    gananciasLink:
      "https://docs.google.com/document/d/1vcK-vbUDB6RuEzALbr4jhyB5ppLz0utNAxuJaw4Uz8Q/edit",
    gmpLink: "no",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1xBP-SNMPRdMOyTjXHX_9mrMXtpCfrzglQVmK0hU-rHQ/edit",
    ivaLink:
      "https://docs.google.com/document/d/1uDN2uxciJoe_ZXihji4jBbt0mE5DmZjqnKcDOtrYOzc/edit",
    monotributoLink:
      "https://docs.google.com/document/d/1OzKrUlaE08eNraPtvPdHvEnftUg7gyvibeFi0LPC1Y8/edit",
    previsionalLink:
      "https://docs.google.com/document/d/1M3N3ZRF7itNNwVmo76t1r-kJ7YIhw7kAv_LwldFnLLc/edit",
    procedimientoLink:
      "https://docs.google.com/document/d/1ZzdssVaqe1p5PT1eBJ3kZ6d0iBJtOdLu9_1rC9xiyMo/edit",
  },
  year2020: {
    agipLink:
      "https://docs.google.com/document/d/1Dm4gk3nZgpYK4Y7LaE42Zn6JGoeRuLFB54HnFQCY7hA/edit",
    arbaLink:
      "https://docs.google.com/document/d/104GMzLpXKcbv6eri1hYsVnEx5g3omW1bnTKAmSAzGEo/edit",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1W1ic8wozI_ine2oMMhgysorml71uc4PT3l4GDQDdljY/edit",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/1xOww72cHZcn2U4NQMIVALxgOR6NISE6EFSUe0yY9O5Q/edit",
    deInteresLink:
      "https://docs.google.com/document/d/1DJ6L4wWjNy_lUyDk8Cx3YxlVJfsLDANQh0K_GKbK8As/edit",
    gananciasLink:
      "https://docs.google.com/document/d/1ty64fVAqrkmkdTwWwsdIj10BdecGZuJujhMdrNuMQM8/edit",
    gmpLink: "no",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1snbV-zzcvGhtFJG1kGnH2u_aqSb0pskiXMpp-tc8EEM/edit",
    ivaLink:
      "https://docs.google.com/document/d/1ISGLmU9h9FArK8Tu-_lcoWcGgfXpAdv7nB5ijP3fH7g/edit",
    monotributoLink:
      "https://docs.google.com/document/d/1uBQ2WbbktAgUCek5Ziy9YZyEkEOtxX-BHGBKzyAfy7k/edit",
    previsionalLink:
      "https://docs.google.com/document/d/1Ta3FYZDRqkSxYS03w4AtnlxELgb9hSO1f-ie_JYH8GE/edit",
    procedimientoLink:
      "https://docs.google.com/document/d/10xzkXhCIOdWrtnt8hQFiIS7mTDsnxk6907TLcQ9SvcU/edit",
  },
  year2019: {
    agipLink:
      "https://docs.google.com/document/d/1StVDORXp2Jz_QepHd_wBpY-WIB2KRH_gvO-QObH5VSQ/edit",
    arbaLink:
      "https://docs.google.com/document/d/1NO7r4h8UMZScBdfHNSKVTzS94xHBCOW1UAGofHIfQ-s/edit",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/17c_BCcQzh2g99gPJESvuXjs_h-oLrwh-vK-njjxvGOw/edit",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/1SbI6-fDRcdJ_c5V2208teUII7Toos-CqOKzApY03cDw/edit",
    deInteresLink:
      "https://docs.google.com/document/d/1lnwZS6P4pkpM4U8oNubVZJu8m5jP0-na5jWbs27WB-k/edit",
    gananciasLink:
      "https://docs.google.com/document/d/1j7WbFQ346fwCi5r6ZN0rJLYtwa4QlUI9KmjElPQdPts/edit",
    gmpLink:
      "https://docs.google.com/document/d/1QOjJeZK9FDz-iskLAL30VyCkjpQ6NBY6yQpcb3m33tM/edit",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1cz2INyWb4mkOoFepB4UkSJSXmP2i7UQ6GjQUKYH2emQ/edit",
    ivaLink:
      "https://docs.google.com/document/d/1puAyqjvxCaJBKeOzr2mWPME5jiZQpEhDXD0CZRXm2W8/edit",
    monotributoLink:
      "https://docs.google.com/document/d/15qMhKbHmsRIEEzZpWFJmpSWbWMYoLEqmEwF9lCA5TrE/edit",
    previsionalLink:
      "https://docs.google.com/document/d/1xIHMDRFygAkBimHoQuHmJ9oCgHFn06s8T96HVo-DQOw/edit",
    procedimientoLink:
      "https://docs.google.com/document/d/1J8p5RhFhKOl5l1YNg4Q_3DqV3GEfzCzJb6plv53tmug/edit",
  },
  year2018: {
    agipLink:
      "https://docs.google.com/document/d/1tyJOjWMmkrvN8yRh90Z7jMjlcIfGSryX_1B6w2jYRac/edit",
    arbaLink:
      "https://docs.google.com/document/d/1rtdDWvxvj7B-6DuZNq1vLam0CONi7Ct-4DUaLiAjQFI/edit",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1NbEJcmmiB5evdjCHPNbzv21-Bxk1erBIgXaegolPXac/edit",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/1vuHQMt1RQIaDRrcFHCeBl3rZA18ZGR_0JJmUCpkpdWo/edit",
    deInteresLink:
      "https://docs.google.com/document/d/1kRvnToO9lwRmtubWsHxYYqvJYh9ijp9fFSZc4CAzfWk/edit",
    gananciasLink:
      "https://docs.google.com/document/d/1XP20AfNnNXfXhIh5iOlnwVeE8IRZiX6_Azn55_FjKuo/edit",
    gmpLink:
      "https://docs.google.com/document/d/1P0marCAgDR1ep8gq0bGFA77Ah_hXlCXG4CkZ9YmMkgY/edit",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1RpxhIVnQzpnSVb0UOgkei28wk9LVdthPsHp2sREdZoI/edit",
    ivaLink:
      "https://docs.google.com/document/d/1E-gy9NaOzxaCOLR2paa7vKaodc4G92onGbNoHPUsce4/edit",
    monotributoLink:
      "https://docs.google.com/document/d/13DgrPQY1E4u4eMaqBKCteFWQ40EOI3O6Kw9_ihIfMRA/edit",
    previsionalLink:
      "https://docs.google.com/document/d/1KabLGQIA1AUUIM24NacwRmCklMjYwSed9kTsmiYBzHs/edit",
    procedimientoLink:
      "https://docs.google.com/document/d/1Un2WrQX5P5Fvq2W0BwufRKgFubM2RL49GOD_zlN21aw/edit",
  },
  year2017: {
    agipLink:
      "https://docs.google.com/document/d/1Ttq4LT0kJCnQMzgl6YEakio69PifZZqZgXJKy6pCwR4/edit",
    arbaLink:
      "https://docs.google.com/document/d/1_IY-UZI27_3aEa_csWFfhLMz90ZX-VZ5dUj84ytF9us/edit",
    bienesPersonalesLink:
      "https://docs.google.com/document/d/1N6b3y3eQgtbJ6DknZmMIjM6dDDBo-IE1heKEUKeH0t0/edit",
    convenioMultilateralLink:
      "https://docs.google.com/document/d/1OxPFXWA9MZSXDf73ShnqDVMfHbLMHGSHRDZHAYP9J5s/edit",
    deInteresLink:
      "https://docs.google.com/document/d/1leRtSGmzpzMBBJ8ERa7bsBi8ZEakXwuMvDg4ridSoTg/edit",
    gananciasLink:
      "https://docs.google.com/document/d/1udwRwSa9xX4nflamt7tevnsMoQ9mQNcr1wrL2e9aeJ4/edit",
    gmpLink:
      "https://docs.google.com/document/d/1YfcFsSX4FjHuzB6IJMHsIT5qNpXEWbRolfJAhdmX9go/edit",
    impuestosVariosLink:
      "https://docs.google.com/document/d/1THbaI88z73lIyM1rUdcQQIwciTrJIgfgHXyyVGxs2E0/edit",
    ivaLink:
      "https://docs.google.com/document/d/1Eh2cqAIdiQzxB4EgA7oY0xIUmEGhZWQff33Z_5wCKQM/edit",
    monotributoLink:
      "https://docs.google.com/document/d/1DMgwrfze4gVOOb6zGl9EnNe5LC_-w7yP1exdZVsi4qA/edit",
    previsionalLink:
      "https://docs.google.com/document/d/1YYG69_YGQTIa3kzac6wisbwlKuS7NkVV4nbzTyXL8ho/edit",
    procedimientoLink:
      "https://docs.google.com/document/d/1Z7GhllrrFpYcVtZNHcOTvgocFlVROlJb8QkTnBdOnKI/edit",
  },
};

$("#seleccionaMesYear").on("change", function () {
  try {
    let mesExpo = document.getElementById("mesExpo");
    let yearExpo = document.getElementById("yearExpo");
    let year = document.getElementById("year").value;
    let mes = document.getElementById("mes").value;
    let mesYear = mes + year;
    let verNovedadesPublic = novedadesImpositivas[mesYear].public;
    let verMaterialPublic = novedadesImpositivas[mesYear].material;
    mesExpo.innerText = $("#mes option:selected").text();
    yearExpo.innerText = $("#year option:selected").text();
    if (verNovedadesPublic == "no") {
      $("#verNovedades").prop("hidden", true);
    } else if (verNovedadesPublic == "si") {
      $("#verNovedades").prop("hidden", false);
    }
    if (verMaterialPublic === "no") {
      $("#verMaterial").prop("hidden", true);
    } else {
      $("#verMaterial").prop("hidden", false);
    }
  } catch (error) {}
});

$("#year").on("change", function () {
  if ($("#year").val() === "reformaTributaria") {
    $("#mes").prop("hidden", true);
    $("#mesLabel").prop("hidden", true);
    $("#verNovedades").prop("hidden", true);
    $("#verMaterial").prop("hidden", true);
    $("#yearExpo").text("");
    $("#mesExpo").text("- Reforma Tributaria");
    $("#reformaTributariaDiv").prop("hidden", false);
  } else {
    $("#mes").prop("hidden", false);
    $("#mesLabel").prop("hidden", false);
    $("#verNovedades").prop("hidden", false);
    $("#verMaterial").prop("hidden", false);
    $("#reformaTributariaDiv").prop("hidden", true);
  }
});

$("#verNovedades").on("click", function () {
  verNovedades();
});

$("#verMaterial").on("click", function () {
  verMaterial();
});

$("#reformaTributariaDiv1").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div1, "");
});

$("#reformaTributariaDiv2").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div2, "");
});

$("#reformaTributariaDiv3").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div3, "");
});

$("#reformaTributariaDiv4").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div4, "");
});

$("#reformaTributariaDiv5").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div5, "");
});

$("#reformaTributariaDiv6").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div6, "");
});

$("#reformaTributariaDiv7").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div7, "");
});

$("#reformaTributariaDiv8").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div8, "");
});

$("#reformaTributariaDiv9").on("click", function () {
  window.open(novedadesImpositivas.reformaTributaria.Div9, "");
});

$("#yearImpuestos").on("change", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    $("#agip").prop("hidden", false);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", true);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#gmp").prop("hidden", true);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#monotributo").prop("hidden", true);
    $("#previsional").prop("hidden", false);
    }else if (yearImpuestos === "2025") {
    $("#agip").prop("hidden", false);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#gmp").prop("hidden", true);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#monotributo").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2024") {
    $("#agip").prop("hidden", false);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#gmp").prop("hidden", true);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2023") {
    $("#gmp").prop("hidden", true);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2022") {
    $("#gmp").prop("hidden", true);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2021") {
    $("#gmp").prop("hidden", true);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2020") {
    $("#gmp").prop("hidden", true);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2019") {
    $("#gmp").prop("hidden", false);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2018") {
    $("#gmp").prop("hidden", false);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2017") {
    $("#gmp").prop("hidden", false);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  }
});

$("#agip").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    agip.onclick = window.open(impuestosNovedades.year2026.agipLink, "");
  } else if (yearImpuestos === "2025") {
    agip.onclick = window.open(impuestosNovedades.year2025.agipLink, "");
  } else if (yearImpuestos === "2024") {
    agip.onclick = window.open(impuestosNovedades.year2024.agipLink, "");
  } else if (yearImpuestos === "2023") {
    agip.onclick = window.open(impuestosNovedades.year2023.agipLink, "");
  } else if (yearImpuestos === "2022") {
    agip.onclick = window.open(impuestosNovedades.year2022.agipLink, "");
  } else if (yearImpuestos === "2021") {
    agip.onclick = window.open(impuestosNovedades.year2021.agipLink, "");
  } else if (yearImpuestos === "2020") {
    agip.onclick = window.open(impuestosNovedades.year2020.agipLink, "");
  } else if (yearImpuestos === "2019") {
    agip.onclick = window.open(impuestosNovedades.year2019.agipLink, "");
  } else if (yearImpuestos === "2018") {
    agip.onclick = window.open(impuestosNovedades.year2018.agipLink, "");
  } else if (yearImpuestos === "2017") {
    agip.onclick = window.open(impuestosNovedades.year2017.agipLink, "");
  }
});

$("#arba").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    arba.onclick = window.open(impuestosNovedades.year2026.arbaLink, "");
  } else if (yearImpuestos === "2025") {
    arba.onclick = window.open(impuestosNovedades.year2025.arbaLink, "");
  } else if (yearImpuestos === "2024") {
    arba.onclick = window.open(impuestosNovedades.year2024.arbaLink, "");
  } else if (yearImpuestos === "2023") {
    arba.onclick = window.open(impuestosNovedades.year2023.arbaLink, "");
  } else if (yearImpuestos === "2022") {
    arba.onclick = window.open(impuestosNovedades.year2022.arbaLink, "");
  } else if (yearImpuestos === "2021") {
    arba.onclick = window.open(impuestosNovedades.year2021.arbaLink, "");
  } else if (yearImpuestos === "2020") {
    arba.onclick = window.open(impuestosNovedades.year2020.arbaLink, "");
  } else if (yearImpuestos === "2019") {
    arba.onclick = window.open(impuestosNovedades.year2019.arbaLink, "");
  } else if (yearImpuestos === "2018") {
    arba.onclick = window.open(impuestosNovedades.year2018.arbaLink, "");
  } else if (yearImpuestos === "2017") {
    arba.onclick = window.open(impuestosNovedades.year2017.arbaLink, "");
  }
});

$("#bienesPersonales").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2026.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2025") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2025.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2024") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2024.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2023") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2023.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2022") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2022.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2021") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2021.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2020") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2020.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2019") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2019.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2018") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2018.bienesPersonalesLink,
      ""
    );
  } else if (yearImpuestos === "2017") {
    bienesPersonales.onclick = window.open(
      impuestosNovedades.year2017.bienesPersonalesLink,
      ""
    );
  }
});

$("#convenioMultilateral").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2026.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2025") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2025.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2024") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2024.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2023") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2023.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2022") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2022.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2021") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2021.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2020") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2020.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2019") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2019.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2018") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2018.convenioMultilateralLink,
      ""
    );
  } else if (yearImpuestos === "2017") {
    convenioMultilateral.onclick = window.open(
      impuestosNovedades.year2017.convenioMultilateralLink,
      ""
    );
  }
});

$("#deInteres").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2026.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2025") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2025.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2024") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2024.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2023") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2023.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2022") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2022.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2021") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2021.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2020") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2020.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2019") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2019.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2018") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2018.deInteresLink,
      ""
    );
  } else if (yearImpuestos === "2017") {
    deInteres.onclick = window.open(
      impuestosNovedades.year2017.deInteresLink,
      ""
    );
  }
});

$("#ganancias").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2026.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2025") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2025.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2024") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2024.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2023") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2023.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2022") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2022.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2021") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2021.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2020") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2020.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2019") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2019.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2018") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2018.gananciasLink,
      ""
    );
  } else if (yearImpuestos === "2017") {
    ganancias.onclick = window.open(
      impuestosNovedades.year2017.gananciasLink,
      ""
    );
  }
});

$("#gmp").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2019") {
    gmp.onclick = window.open(impuestosNovedades.year2019.gmpLink, "");
  } else if (yearImpuestos === "2018") {
    gmp.onclick = window.open(impuestosNovedades.year2018.gmpLink, "");
  } else if (yearImpuestos === "2017") {
    gmp.onclick = window.open(impuestosNovedades.year2017.gmpLink, "");
  }
});

$("#impuestosVarios").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2026.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2025") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2025.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2024") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2024.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2023") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2023.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2022") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2022.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2021") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2021.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2020") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2020.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2019") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2019.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2018") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2018.impuestosVariosLink,
      ""
    );
  } else if (yearImpuestos === "2017") {
    impuestosVarios.onclick = window.open(
      impuestosNovedades.year2017.impuestosVariosLink,
      ""
    );
  }
});

$("#iva").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    iva.onclick = window.open(impuestosNovedades.year2026.ivaLink, "");
  } else if (yearImpuestos === "2025") {
    iva.onclick = window.open(impuestosNovedades.year2025.ivaLink, "");
  } else if (yearImpuestos === "2024") {
    iva.onclick = window.open(impuestosNovedades.year2024.ivaLink, "");
  } else if (yearImpuestos === "2024") {
    iva.onclick = window.open(impuestosNovedades.year2023.ivaLink, "");
  } else if (yearImpuestos === "2022") {
    iva.onclick = window.open(impuestosNovedades.year2022.ivaLink, "");
  } else if (yearImpuestos === "2021") {
    iva.onclick = window.open(impuestosNovedades.year2021.ivaLink, "");
  } else if (yearImpuestos === "2020") {
    iva.onclick = window.open(impuestosNovedades.year2020.ivaLink, "");
  } else if (yearImpuestos === "2019") {
    iva.onclick = window.open(impuestosNovedades.year2019.ivaLink, "");
  } else if (yearImpuestos === "2018") {
    iva.onclick = window.open(impuestosNovedades.year2018.ivaLink, "");
  } else if (yearImpuestos === "2017") {
    iva.onclick = window.open(impuestosNovedades.year2017.ivaLink, "");
  }
});

$("#monotributo").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2026.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2025") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2025.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2024") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2024.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2023") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2023.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2022") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2022.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2021") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2021.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2020") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2020.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2019") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2019.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2018") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2018.monotributoLink,
      ""
    );
  } else if (yearImpuestos === "2017") {
    monotributo.onclick = window.open(
      impuestosNovedades.year2017.monotributoLink,
      ""
    );
  }
});

$("#previsional").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    previsional.onclick = window.open(
      impuestosNovedades.year2026.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2025") {
    previsional.onclick = window.open(
      impuestosNovedades.year2025.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2024") {
    previsional.onclick = window.open(
      impuestosNovedades.year2024.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2023") {
    previsional.onclick = window.open(
      impuestosNovedades.year2023.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2022") {
    previsional.onclick = window.open(
      impuestosNovedades.year2022.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2021") {
    previsional.onclick = window.open(
      impuestosNovedades.year2021.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2020") {
    previsional.onclick = window.open(
      impuestosNovedades.year2020.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2019") {
    previsional.onclick = window.open(
      impuestosNovedades.year2019.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2018") {
    previsional.onclick = window.open(
      impuestosNovedades.year2018.previsionalLink,
      ""
    );
  } else if (yearImpuestos === "2017") {
    previsional.onclick = window.open(
      impuestosNovedades.year2017.previsionalLink,
      ""
    );
  }
});

$("#procedimiento").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2026") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2026.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2025") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2025.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2024") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2024.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2023") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2023.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2022") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2022.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2021") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2021.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2020") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2020.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2019") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2019.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2018") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2018.procedimientoLink,
      ""
    );
  } else if (yearImpuestos === "2017") {
    procedimiento.onclick = window.open(
      impuestosNovedades.year2017.procedimientoLink,
      ""
    );
  }
});

$("#ultimaNovedades").on("click", function () {
  window.open(
    "https://docs.google.com/document/d/1OXDwE27jZuiTa5I3ZWJdsEtKRIw2SuOWc6GcOVLZuoo/edit?usp=sharing",
    ""
  );
});