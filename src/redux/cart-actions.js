import {cartActions, uiActions} from "./index";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://reactfoodapp-c9892-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
            );

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            return await response.json();

        };

        try {
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    };
};

export const sendCart = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'pending',
            message: 'sending cart data pending',
        }))
        const sendRequest = async () => {
            const response = await fetch('https://reactfoodapp-c9892-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                })
            });
            if(!response.ok){
                throw new Error('Failed')
            }
        }

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'success',
                message: 'sending cart data successfully',
            }))
        }catch (error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'error',
                message: 'sending cart data error',
            }))
        }

    }
}