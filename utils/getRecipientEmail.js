const getRecipientEmail = (users, userLoggedIn) => 
    users?.filter(userToFilter => userToFilter.email !== userLoggedIn?.email)[1];

export default getRecipientEmail;