import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="flex flex-col pt-2 ">
      {/* <div className="p-1 px-4 pt-3 py-7 w-full bg-white rounded shadow-md flex flex-col items-center justify-center text-lg font-semibold">
        bar
      </div> */}
      <div className="p-3 ">
        <Button
          message={"Active "}
          bgColor={"bg-custom-navy"}
          hoverBgColor={"hover:bg-custom-navy"}
          textColor={"white"}
        />
      </div>
      <div className="grid grid-cols-3 p-2 gap-2">
        <div className="flex-grow p-6 py-10  bg-white rounded-xl shadow-md">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-xl"> Menu Name 1</h4>
            <div>Menu Type: Degustation</div>
            <Button
              message={"View Menu"}
              bgColor={"bg-custom-navy"}
              hoverBgColor={"bg-custom-navy"}
              textColor={"white"}
            />
          </div>
        </div>
        <div className="flex-grow p-6 py-10  bg-white rounded-xl shadow-md">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-xl"> Menu Name 4</h4>
            <div>Menu Type: Degustation</div>
            <Button
              message={"View Menu"}
              bgColor={"bg-custom-navy"}
              hoverBgColor={"bg-custom-navy"}
              textColor={"white"}
            />
          </div>
        </div>
        <div className="flex-grow p-6 py-10  bg-white rounded-xl shadow-md">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-xl"> Menu Name 3</h4>
            <div>Menu Type: Degustation</div>
            <Button
              message={"View Menu"}
              bgColor={"bg-custom-navy"}
              hoverBgColor={"bg-custom-navy"}
              textColor={"white"}
            />
          </div>
        </div>
        <div className="flex-grow p-6 py-10  bg-white rounded-xl shadow-md">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-xl"> Menu Name </h4>
            <div>Menu Type: A la carte</div>
            <Button
              message={"View Menu"}
              bgColor={"bg-custom-navy"}
              hoverBgColor={"bg-custom-navy"}
              textColor={"white"}
            />
          </div>
        </div>
        <div className="flex-grow p-6 py-10 bg-white rounded-xl shadow-md flex justify-center items-center">
          <Link
            className="flex opacity-70 justify-center items-center "
            to={"/newmenu"}
          >
            <FaPlus color="black" size={56} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
