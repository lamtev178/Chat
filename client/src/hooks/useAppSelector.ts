import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { AppDispatch, RootState } from "~/store/configureStore"
import ActionCreators from "@/store/action-creators"

export const useAppDispatch = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector