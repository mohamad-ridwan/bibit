import GetCategory from "./category/get";
import GetNavbar from "./navbar/get";

const APIGetNavbar = ()=>GetNavbar('v1/navbar/get')
const APIGetCategory = ()=>GetCategory('v2/category/get')

const API = {
    APIGetNavbar,
    APIGetCategory
}

export default API