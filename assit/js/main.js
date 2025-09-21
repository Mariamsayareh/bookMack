const input = Array.from(document.querySelectorAll(".form-control"));
const book_mark_form = document.querySelector(".book_mark");
const text_danger = document.querySelectorAll(".text-danger");
let edit_index = null;
const edit_itme_btn = document.querySelector(".edit_itmesss");
const search_input = document.querySelector(".search-input");
const remove_all_btn = document.querySelector(".remove_all");
const validate_site_name = () => {
    const regex = /^[A-Z][a-z]{2,}$/;
    if (!regex.test(input[0].value)) {
        input[0].classList.remove("is-valid");
        input[0].classList.add("is-invalid");
        text_danger[0].textContent = "Invalid name ,The name must start with a capital letter.";
        return false;
    } else {
        input[0].classList.remove("is-invalid");
        input[0].classList.add("is-valid");
        text_danger[0].textContent = "";
        return true;
    }
}
input[0].addEventListener("input", validate_site_name);
//email
const validate_site_email = () => {
    const re_simple = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!re_simple.test(input[2].value)) {
        input[2].classList.remove("is-valid");
        input[2].classList.add("is-invalid");
        text_danger[1].textContent = "Enter a valid email, e.g., example@domain.com";
        return false;
    } else {
        input[2].classList.remove("is-invalid");
        input[2].classList.add("is-valid");
        text_danger[1].textContent = "";
        return true;
    }
}
input[2].addEventListener("input", validate_site_email);
//password
const validate_site_password = () => {
    const re_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!re_password.test(input[3].value)) {
        input[3].classList.remove("is-valid");
        input[3].classList.add("is-invalid");
        text_danger[2].textContent = "Password must have at least 8 characters, including uppercase, lowercase, and a number";
        return false;
    } else {
        input[3].classList.remove("is-invalid");
        input[3].classList.add("is-valid");
        text_danger[2].textContent = "";
        return true;
    }
}
input[3].addEventListener("input", validate_site_password);
const edit_itme = (index) => {
    edit_index = index;

    const site = sites[index];
    input[0].value = site.site_name;
    input[1].value = site.site_url;
    input[2].value = site.site_email;
    input[3].value = site.site_password;
    document.querySelector(".add").classList.remove("btn-outline-warning");
    document.querySelector(".add").classList.add("btn-outline-success");
    document.querySelector(".add").textContent = "Update";
    //sites.splice(edit_index, 0);
    console.log(sites[index]);
    console.log(edit_index);
    //console.log(sites.splice(edit_index, 0, sites[index]));
    //update_itme(site);
}
let sites = JSON.parse(localStorage.getItem("sites")) || [];
book_mark_form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate_site_name() || !validate_site_email() || !validate_site_password()) {
        return
    }
    const site = {
        site_name: input[0].value,
        site_url: input[1].value,
        site_email: input[2].value,
        site_password: input[3].value
    };
    if (edit_index === null) {
        sites.push(site);
    } else {
        sites[edit_index] = site;
        edit_index = null;
        document.querySelector(".add").classList.remove("btn-outline-success");
        document.querySelector(".add").classList.add("btn-outline-warning");
        document.querySelector(".add").textContent = "Add";
    }
    localStorage.setItem("sites", JSON.stringify(sites));

    book_mark_form.reset();
    mark_data();
});
console.log(sites);
//sites.splice(1, 1)
const mark_data = () => {
    console.log(sites);

    const result = sites.map((site, index) => {
        return `<tr>
        <td>${index}</td>
        <td>${site.site_name}</td>
        <td>${site.site_url}</td>
        <td>${site.site_email}</td>
        <td>${site.site_password}</td>
        <td><button type="button" class="btn btn-outline-danger" onclick="remove_itme(${index})" ">Remove</button></td>
        <td><button type="button" class="btn btn-outline-info edit_itmesss" onclick="edit_itme(${index})" ">Edit</button></td>
        </tr>`
    }).join("");

    document.querySelector(".sites_data").innerHTML = result;

}
mark_data();
const remove_itme = (index) => {
    console.log("dsadsد");

    sites.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(sites));
    mark_data();
}
remove_all_btn.addEventListener("click", () => {
    localStorage.removeItem("sites");
    sites = [];
    mark_data();
});



console.log(edit_index);
// const update_itme = (site) => {
//     console.log(sites);
//     console.log(site);
//     //console.log(sites[index]);
//     console.log(edit_index);
//     sites[edit_index] = site;
//     edit_index = null;
//     document.querySelector(".add").textContent = "Add";
// }
console.log(edit_index);
// edit_itme_btn.addEventListener("click", (e) => {
//     e.preventDefault();

//     if (!validate_site_name() || !validate_site_email() || !validate_site_password()) {
//         return
//     }
//     const site = {
//         site_name: input[0].value,
//         site_url: input[1].value,
//         site_email: input[2].value,
//         site_password: input[3].value
//     };
//     sites.push(site);

// })
search_input.addEventListener("input", () => {
    console.log("fvwfvwvw")
    const filter_text = search_input.value.toLowerCase();
    const filtered_sites = sites.filter((site) => {
        return site.site_name.toLowerCase().includes(filter_text);
    });
    const result = filtered_sites.map((site, index) => {
        return `<tr>
        <td>${index}</td>
        <td>${site.site_name}</td>
        <td>${site.site_url}</td>
        <td>${site.site_email}</td>
        <td>${site.site_password}</td>
        <td><button type="button" class="btn btn-outline-danger" onclick="remove_itme(${index})" ">Remove</button></td>
        <td><button type="button" class="btn btn-outline-info edit_itmesss" onclick="edit_itme(${index})" ">Edit</button></td>
        </tr>`
    }).join("");

    document.querySelector(".sites_data").innerHTML = result;
});