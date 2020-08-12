import {Archive,Radio,Livetv} from"./components";
// import Archive from "./Archive";
// import Radio from "./Radio";
// import Livetv from "./Livetv";
export default[
    { path: "/archives", name: "Archive", Component: Archive },
    { path: "/radio", name: "Radio", Component: Radio },
    { path: "/livetv", name: "Livetv", Component: Livetv },
]