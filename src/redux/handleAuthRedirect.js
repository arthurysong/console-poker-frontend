export default function handleAuthRedirect(isLoggedIn, history){
    let curr_url = window.location.pathname;
    // console.log(isLoggedIn, curr_url);
    if (isLoggedIn && (curr_url === "/" || curr_url === "/login" || curr_url === "/register")) { // redirect for setLogin if user is logged in
        history.replace(`/main`);
    } else if (!isLoggedIn && (curr_url === "/rooms" || curr_url === "/" || /^\/{1}rooms\/{1}.+$/.test(curr_url) || /^\/{1}users\/{1}.+$/.test(curr_url))) { // redirect for setLogin at rooms url if usuer is not logged in
        history.replace(`/login`)
    } 
}