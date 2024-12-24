function verNovedades() {
  let year = document.getElementById("year").value;
  let mes = document.getElementById("mes").value;
  let mesYear = mes + year;
  let verNovedadesValue = novedadesImpositivas[mesYear].link;
  let verNovedadesPublic = novedadesImpositivas[mesYear].public;
  window.open(verNovedadesValue, "");
}

function cargaInicio() {
  $("#iva").prop("hidden", true);
}

cargaInicio();

let novedadesImpositivas = {
  enero2024: {
    link: "https://docs.google.com/document/d/1OxaS-VK5EFfuauN3Sk_V1diU0E6kGFSIzLwUV2gITg0/edit",
    public: "si",
  },
  febrero2024: {
    link: "https://docs.google.com/document/d/1S91-hSezLMwK7anmsqHrN6xliyZnLmIZCZ6iEAroK0w/edit",
    public: "si",
  },
  marzo2024: {
    link: "https://docs.google.com/document/d/1EaVJC18NFvXxZN7Ikqjh-vwFUvJVxv4PtAuHmfUX6aI/edit",
    public: "si",
  },
  abril2024: {
    link: "https://docs.google.com/document/d/14TQmEB-aD0Q41ztcpowFxS6zMWvCSIyAlHXeHQng9SQ/edit",
    public: "si",
  },
  mayo2024: {
    link: "https://docs.google.com/document/d/1y3wXpuxv9F_oxd9Hn4TMc6DBoQXlz1wXQg04A1nDzOI/edit",
    public: "si",
  },
  junio2024: {
    link: "https://docs.google.com/document/d/1_w_lwiqpFcX6p2GrISnstO-pHQcecCkIEBXqxkGc7p0/edit",
    public: "si",
  },
  julio2024: {
    link: "https://docs.google.com/document/d/1mXuD-SliqgvXwsDt-XWeCldVI4x7IaA1WRgBl6NWuFE/edit",
    public: "si",
  },
  agosto2024: {
    link: "https://docs.google.com/document/d/1yVF8zaaVTm8XsHofNfhqG8t3hU_sPjzxakCmWTiobSg/edit",
    public: "si",
  },
  septiembre2024: {
    link: "https://docs.google.com/document/d/1amLgRJomIbLQLXiULdI84ZlAi0yyUatXmKIWknyU5so/edit",
    public: "si",
  },
  octubre2024: {
    link: "https://docs.google.com/document/d/1WZTxL7WJlFu9pvu2c08n5NxirJ1pzy6c1TW7UGMyh0Q/edit",
    public: "si",
  },
  noviembre2024: {
    link: "https://docs.google.com/document/d/1DtFWu4YNXm2xbyQoOwcAsbDfTSHhQ9uMYz-pQNX-0y8/edit",
    public: "si",
  },
  diciembre2024: {
    link: "https://docs.google.com/document/d/1Aia_gsLqE-pFYcYSmOyoj9vDH3v7da2H-cKtCW_lsIU/edit",
    public: "si",
  },
  enero2023: {
    link: "https://docs.google.com/document/d/1UbObPtG9z9HS3h9oQTKzVz179NoHJQhbcGm_1GHTTsk/edit",
    public: "si",
  },
  febrero2023: {
    link: "https://docs.google.com/document/d/1RU7wVt951B4boAmt8aZwSlvoRuiQuutmyCajFebOowY/edit",
    public: "si",
  },
  marzo2023: {
    link: "https://docs.google.com/document/d/1zxRMqNeT8aUfHWgJDItOLL5VoaILNcr2sIPw2ZNOFe0/edit",
    public: "si",
  },
  abril2023: {
    link: "https://docs.google.com/document/d/17nw4n5m-CJ5_s3AJMzY9mejYr5n-DaIkIwyICPIgXHw/edit",
    public: "si",
  },
  mayo2023: {
    link: "https://docs.google.com/document/d/1IIIU_kSiga4ElbPmgMMAGYw7T2InsjZEEu7K_5oiGjg/edit",
    public: "si",
  },
  junio2023: {
    link: "https://docs.google.com/document/d/14xHpmebowSTMpmoh6UN8jdV_smkUYozJ2EGIoF-lgRA/edit",
    public: "si",
  },
  julio2023: {
    link: "https://docs.google.com/document/d/128oz3CdUiFEqgXp7FPG094r0iImPAzYESjOPdXnKREI/edit",
    public: "si",
  },
  agosto2023: {
    link: "https://docs.google.com/document/d/1nq9tOAq-xd1cTkJ4eRH672I-njU04PaPku5DuVfhW2A/edit",
    public: "si",
  },
  septiembre2023: {
    link: "https://docs.google.com/document/d/1lt8BqIA6ZQ0bf9M_FVfpGToBAIMEuPOFFPMkGf6xI0g/edit",
    public: "si",
  },
  octubre2023: {
    link: "https://docs.google.com/document/d/1-S1fJ8StwfxFAKM1o-vjcqBzyV52fxiECgYl2fOz2iI/edit",
    public: "si",
  },
  noviembre2023: {
    link: "https://docs.google.com/document/d/1REl9iPTT_sV6blBlDVLxiBo0yvbamNxX1LzLbY9kc6s/edit",
    public: "si",
  },
  diciembre2023: {
    link: "https://docs.google.com/document/d/1Cq7imYxuy9DAQwDnALPIppNmKVy501dzs45TMb48pcw/edit",
    public: "si",
  },
  enero2022: {
    link: "https://docs.google.com/document/d/1z1MWLqd__9w3Ouydt55wYr4MwGR2ww7CyNtN2i_AlM0/edit",
    public: "si",
  },
  febrero2022: {
    link: "https://docs.google.com/document/d/1TGGxRrKfLcfs8WVvqCsocfi6wfNJUNlZ98_3q5UKWtY/edit",
    public: "si",
  },
  marzo2022: {
    link: "https://docs.google.com/document/d/1Zf7TUWQ1yn8mmQugP4etuzG3RPQnsizZ38tFvvRpJpU/edit",
    public: "si",
  },
  abril2022: {
    link: "https://docs.google.com/document/d/1VOD-xKHaqQtRAU_dZEPpTGxfQsghNBHje4Tq1Bo4c-M/edit",
    public: "si",
  },
  mayo2022: {
    link: "https://docs.google.com/document/d/1l_A19Cjs2ZG6YcUQs_2BZErXxa3SZ4SgiCWBdKhfZfo/edit",
    public: "si",
  },
  junio2022: {
    link: "https://docs.google.com/document/d/1asmcEL_idn1RZXXPoJlQw5zK7-pj43gwhlsEB90PNlI/edit",
    public: "si",
  },
  julio2022: {
    link: "https://docs.google.com/document/d/1WeEH51oO6nZYb_O71ZKJu87oYgLqaN8RBvXxCEvFA3A/edit",
    public: "si",
  },
  agosto2022: {
    link: "https://docs.google.com/document/d/1DZMoF0DvPstC6ZA64CUuI_i6mwBztKcV8rAgPYwsZpc/edit",
    public: "si",
  },
  septiembre2022: {
    link: "https://docs.google.com/document/d/1GDmr6PQO-hvy1yoJ30RKtJu0UEvqUKEIhyLuaVTvFO8/edit",
    public: "si",
  },
  octubre2022: {
    link: "https://docs.google.com/document/d/1rD_nH0KBFCAE5mx1j3eUEPDPDeuilRYJhEmvBC1KgyM/edit",
    public: "si",
  },
  noviembre2022: {
    link: "https://docs.google.com/document/d/1X3_rkqreXun31j1PFlkcMlmqqnU73SPKfosmL8VMEhs/edit",
    public: "si",
  },
  diciembre2022: {
    link: "https://docs.google.com/document/d/1rGqaqRmxBN4Tto_OQn44ZdPeH9qwrHLqErhbR5F_R1I/edit",
    public: "si",
  },
  enero2021: {
    link: "https://docs.google.com/document/d/1l6Raq8Q03d7MEStBL1Qnv5u5bjdqIBzx4WHNOLCEcCA/edit",
    public: "si",
  },
  febrero2021: {
    link: "https://docs.google.com/document/d/1Tlk0zmv3DHC0LsBMBXdbWl1ismcAXJYcTsyt9LCL0pE/edit",
    public: "si",
  },
  marzo2021: {
    link: "https://docs.google.com/document/d/1VgGcT2SHsAYpvlYo6tdVLx6nwtI3yPonPXVVqOoqM-c/edit",
    public: "si",
  },
  abril2021: {
    link: "https://docs.google.com/document/d/1Sgnw1N0kYU299joQfyP_r3P2QuUMD31e4vUII5Agqvk/edit",
    public: "si",
  },
  mayo2021: {
    link: "https://docs.google.com/document/d/1uHc4l9xgIuML-Qthie5PXxAFDTbv-t_rNN90uyqyEEI/edit",
    public: "si",
  },
  junio2021: {
    link: "https://docs.google.com/document/d/1pv7eg75WW8HsZyLJEhd0tCnbeLr-afXZUcyxZuhO0zk/edit",
    public: "si",
  },
  julio2021: {
    link: "https://docs.google.com/document/d/1jWW15pfC2hC7JCc0FXDNMzEOkA5Wt9uuUsTEW1l-kcU/edit",
    public: "si",
  },
  agosto2021: {
    link: "https://docs.google.com/document/d/1CkkKqlbg3UEfoCP9xl53RzDQfZ0uNlIUsGb9GHK_fJo/edit",
    public: "si",
  },
  septiembre2021: {
    link: "https://docs.google.com/document/d/11D1VirEv7exjX1EVeJ40WmaVqW8qtOh0yRpguRhS4kQ/edit",
    public: "si",
  },
  octubre2021: {
    link: "https://docs.google.com/document/d/1h3YNY_ylXum7tPzm_RQLedM3P3mMRQelyxF_CQt_KaQ/edit",
    public: "si",
  },
  noviembre2021: {
    link: "https://docs.google.com/document/d/1aSwMX7GCfBq5rooauAoCCEBn2BrYvuqMZAs1-HaJ6II/edit",
    public: "si",
  },
  diciembre2021: {
    link: "https://docs.google.com/document/d/1nhdPD021tYnDCbB7CqPchNqhpwA0DdB6z4Lag8h6IEc/edit",
    public: "si",
  },
  enero2020: {
    link: "https://docs.google.com/document/d/1UodyRLvXL_j6BwDpT_58SXX-8Zx7VBb45Q3kjqbnaq4/edit",
    public: "si",
  },
  febrero2020: {
    link: "https://docs.google.com/document/d/1LVPq8ZP3fIiyHwRICXZ2CrWi97Ix-rSe_VkSmz6JeH0/edit",
    public: "si",
  },
  marzo2020: {
    link: "https://docs.google.com/document/d/1a1_ZaTc-1becrQ1fn0Py2wCc9F8DyGP3YT39OkBRda8/edit",
    public: "si",
  },
  abril2020: {
    link: "https://docs.google.com/document/d/1FlkXCKynH1gbPwPujFL4xxaPxa8GuaX1tEW05LWPnoE/edit",
    public: "si",
  },
  mayo2020: {
    link: "https://docs.google.com/document/d/1M_eY7f-4__i6_SmDiBHilF4jLePj6XnAJvZc0Mug8BE/edit",
    public: "si",
  },
  junio2020: {
    link: "https://docs.google.com/document/d/15l5T1NbLFzOrvCNirCrveYME5PQAV_n0WLb5ayEdD0E/edit",
    public: "si",
  },
  julio2020: {
    link: "https://docs.google.com/document/d/1Spx-3vxpbXggZACszpW_6WEiCKiZg32Co388SbP9MM4/edit",
    public: "si",
  },
  agosto2020: {
    link: "https://docs.google.com/document/d/1kv60Wl1dbYLLVDcCM2mPVld4qRTLZz21MjsZYxzrMD8/edit",
    public: "si",
  },
  septiembre2020: {
    link: "https://docs.google.com/document/d/1y37Lw4UiJXkOj4w5aA5llgNA9Yjw3JoI3Bcqnoukfys/edit",
    public: "si",
  },
  octubre2020: {
    link: "https://docs.google.com/document/d/1qZAdbP7FBab4y04RjnQXHb6vKWzntBZ49gy0DIw4k88/edit",
    public: "si",
  },
  noviembre2020: {
    link: "https://docs.google.com/document/d/14J9MHnsGEaLG5mSOYu3pc20iJMwN9xwrj_Ir104ud4I/edit",
    public: "si",
  },
  diciembre2020: {
    link: "https://docs.google.com/document/d/1MoolQ7xqzlNlIyRbYBOgbaGS53HMrWVtvyOmkcoIefc/edit",
    public: "si",
  },
};

let impuestosNovedades = {
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
};

$("#seleccionaMesYear").on("change", function () {
  try {
    let mesExpo = document.getElementById("mesExpo");
    let yearExpo = document.getElementById("yearExpo");
    let year = document.getElementById("year").value;
    let mes = document.getElementById("mes").value;
    let mesYear = mes + year;
    let verNovedadesPublic = novedadesImpositivas[mesYear].public;
    mesExpo.innerText = $("#mes option:selected").text();
    yearExpo.innerText = $("#year option:selected").text();
    if (verNovedadesPublic == "no") {
      $("#verNovedades").prop("hidden", true);
    } else if (verNovedadesPublic == "si") {
      $("#verNovedades").prop("hidden", false);
    }
  } catch (error) {}
});

$("#verNovedades").on("click", function () {
  verNovedades();
});

$("#yearImpuestos").on("change", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
    $("#agip").prop("hidden", false);
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", true);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2023") {
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2022") {
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2021") {
    $("#arba").prop("hidden", false);
    $("#bienesPersonales").prop("hidden", false);
    $("#convenioMultilateral").prop("hidden", false);
    $("#ganancias").prop("hidden", false);
    $("#impuestosVarios").prop("hidden", false);
    $("#iva").prop("hidden", false);
    $("#previsional").prop("hidden", false);
  } else if (yearImpuestos === "2020") {
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
  if (yearImpuestos === "2024") {
    agip.onclick = window.open(impuestosNovedades.year2024.agipLink, "");
  } else if (yearImpuestos === "2023") {
    agip.onclick = window.open(impuestosNovedades.year2023.agipLink, "");
  } else if (yearImpuestos === "2022") {
    agip.onclick = window.open(impuestosNovedades.year2022.agipLink, "");
  } else if (yearImpuestos === "2021") {
    agip.onclick = window.open(impuestosNovedades.year2021.agipLink, "");
  } else if (yearImpuestos === "2020") {
    agip.onclick = window.open(impuestosNovedades.year2020.agipLink, "");
  }
});

$("#arba").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
    arba.onclick = window.open(impuestosNovedades.year2024.arbaLink, "");
  } else if (yearImpuestos === "2023") {
    arba.onclick = window.open(impuestosNovedades.year2023.arbaLink, "");
  } else if (yearImpuestos === "2022") {
    arba.onclick = window.open(impuestosNovedades.year2022.arbaLink, "");
  } else if (yearImpuestos === "2021") {
    arba.onclick = window.open(impuestosNovedades.year2021.arbaLink, "");
  } else if (yearImpuestos === "2020") {
    arba.onclick = window.open(impuestosNovedades.year2020.arbaLink, "");
  }
});

$("#bienesPersonales").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
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
  }
});

$("#convenioMultilateral").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
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
  }
});

$("#deInteres").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
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
  }
});

$("#ganancias").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
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
  }
});

$("#impuestosVarios").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
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
  }
});

$("#iva").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
    iva.onclick = window.open(impuestosNovedades.year2024.ivaLink, "");
  } else if (yearImpuestos === "2024") {
    iva.onclick = window.open(impuestosNovedades.year2023.ivaLink, "");
  } else if (yearImpuestos === "2022") {
    iva.onclick = window.open(impuestosNovedades.year2022.ivaLink, "");
  } else if (yearImpuestos === "2021") {
    iva.onclick = window.open(impuestosNovedades.year2021.ivaLink, "");
  } else if (yearImpuestos === "2020") {
    iva.onclick = window.open(impuestosNovedades.year2020.ivaLink, "");
  }
});

$("#monotributo").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
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
  }
});

$("#previsional").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
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
  }
});

$("#procedimiento").on("click", function () {
  let yearImpuestos = document.getElementById("yearImpuestos").value;
  if (yearImpuestos === "2024") {
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
  }
});

$("#ultimaNovedades").on("click", function () {
  window.open(
    "https://docs.google.com/document/d/1Aia_gsLqE-pFYcYSmOyoj9vDH3v7da2H-cKtCW_lsIU/edit?tab=t.0",
    ""
  );
});
