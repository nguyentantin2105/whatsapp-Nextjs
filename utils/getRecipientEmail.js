const getRecipientEmail = (users, userLoggedIn) => 
    users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0];

export default getRecipientEmail;

// 26 39 08 52 