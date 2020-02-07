module.exports.validateSignupInput = (username, email, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username is required";
  } else if (username.length < 5) {
    errors.username = "username requires 5 characters";
  }
  if (email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email is not valid";
    }
  }
  if (password.trim() === "") {
    errors.password = "Password is required";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email is required";
  }
  if (password.trim() === "") {
    errors.password = "Password is required";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateCreateCustomer = (
  fullname,
  asal,
  noid,
  identitas,
  durasi
) => {
  const errors = {};
  if (fullname.trim() === "") {
    errors.fullname = "Masukkan nama lengkap customer";
  }
  if (identitas.trim() === "") {
    errors.identitas = "Masukkan identitas customer";
  }
  if (noid.trim() === "") {
    errors.noid = "Masukkan Nomor identitas customer";
  }
  if (asal.trim() === "") {
    errors.asal = "Masukkan asal customer";
  }
  if (durasi.length < 1 || durasi === 0) {
    errors.durasi = "Masukkan durasi menginap";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
