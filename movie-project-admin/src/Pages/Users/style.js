import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyle = makeStyles((theme) => {
  return {
    buttonDelete: {
      backgroundColor: "#FF3333",
      color: "white",
      "&:hover": {
        backgroundColor: "#FF0033",
      },
      marginBottom: 8,
    },
    buttonEdit: {
      backgroundColor: "#3366FF",
      color: "white",
      marginRight: 8,
      marginBottom: 8,
      "&:hover": {
        backgroundColor: "#3300FF",
        color: "white",
      },
    },
    buttonAdd: {
      margin: "20px 0",
      textAlign: "right",
    },
    pagination: {
      display: "flex",
      justifyContent: "flex-end",
      margin: "20px 0 !important",
    },
    marginTitle: {
      marginTop: "115px !important",
      marginBottom: 30,
    },
  };
});

export default useStyle;
