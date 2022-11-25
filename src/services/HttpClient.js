export const HttpClient = {
  customFetch: (type, url, data, success, error, always) => {
    const options = {
      method: type,
      headers: {
        Accept: "application/json",
      },
    };
    if (type === "PUT") {
      options.headers["Content-Type"] = "application/json";
    }
    if (data) {
      options.body = data;
    }
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          if (type === "DELETE") {
            return response;
          }
          return response.json();
        }
      })
      .then((response) => {
        if (success) {
          success(response);
        }
      })
      .catch((errors) => {
        if (errors.response && error) {
          error(errors);
        }
      })
      .then(() => {
        if (always) {
          always();
        }
      });
  },
};
