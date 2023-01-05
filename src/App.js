import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import {uiActions} from "./redux";
import Notification from "./components/UI/Notifications";
import {fetchCartData, sendCart} from "./redux/cart-actions";


let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCart = useSelector(state => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification)

    useEffect(() => {
        dispatch(fetchCartData())
    }, [dispatch])

    useEffect(() => {
        // const sendCartData = async () =>{
        //     dispatch(uiActions.showNotification({
        //         status: 'pending',
        //         title: 'pending',
        //         message: 'sending cart data pending',
        //     }))
        //     const response = await fetch('https://reactfoodapp-c9892-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
        //         method: 'PUT',
        //         body: JSON.stringify(cart)
        //     });
        //     if(!response.ok){
        //         throw new Error('Failed')
        //     }
        //
        //     dispatch(uiActions.showNotification({
        //         status: 'success',
        //         title: 'success',
        //         message: 'sending cart data successfully',
        //     }))
        // }

        if(isInitial){
            isInitial = false;
            return;
        }
        //
        // sendCartData().catch(error => {
        //     dispatch(uiActions.showNotification({
        //         status: 'error',
        //         title: 'error',
        //         message: 'sending cart data error',
        //     }))
        // })

        if(cart.change){
            dispatch(sendCart(cart))
        }
    },[cart, dispatch])

  return (
      <Fragment>
          {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
        {showCart && <Cart />}
      <Products />
    </Layout>
      </Fragment>
  );
}

export default App;
