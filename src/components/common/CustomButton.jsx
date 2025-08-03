import { Button } from "antd";

const CustomButton = ({ value, onclick, className ,type,disable}) => {
  return (
    <div>
      <Button
         disabled={disable??false}
        className={`text-white    hover:!text-white font-semibold py-5  !border-none rounded-lg ${className}`}
        onClick={onclick}
        type={type}
      >
        {value}
      </Button>
    </div>
  );
};
export default CustomButton;
