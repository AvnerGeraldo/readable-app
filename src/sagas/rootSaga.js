import { all } from 'redux-saga/effects'

//Watchers
//Login
import watchIsLogged from './Login/is_logged_saga'
import watchLogin from './Login/login_saga'
import watchLoginFail from './Login/error_logging_saga'
import watchLogout from './Login/logout_saga'

//Posts
import watchPostsGetAll from './Posts/get_all_data_saga'
import watchVoteChange from './Posts/change_vote_score_saga'
import watchPostDelete from './Posts/delete_post_saga'
import watchPostCreate from './Posts/create_post_saga'
import watchPostByCategory from './Posts/get_data_by_category_saga'
import watchInitialDataEditPost from './Posts/initial_data_edit_post_saga'
import watchChangeDataPost from './Posts/change_data_post'
import watchPostById from './Posts/get_data_by_id_saga'

//Comments
import watchPostCommentsById from './Comments/get_all_data_comments_by_id_saga'
import watchChangeVoteComments from './Comments/change_vote_sagas'
import watchChangeComment from './Comments/handle_comment_sagas'
import watchDeleteComment from './Comments/delete_comment_sagas'

//Categories
import watchCategoriesAll from './Categories/get_all_categories_saga'

//Modal(Create Post)
import { watchOpenModalCreatePost, watchCloseModalCreatePost } from './Posts/handle_modal_create_post_sagas'

//Filters
import watchFiltersChange from './Filter/change_filters_saga'
import watchFiltersGet from './Filter/get_filters_saga'

//Export data
export default function* () {
    yield all([
        watchIsLogged(),
        watchLogin(),
        watchLoginFail(),
        watchLogout(),
        watchPostsGetAll(),
        watchPostDelete(),
        watchVoteChange(),
        watchPostCreate(),
        watchPostByCategory(),
        watchInitialDataEditPost(),
        watchChangeDataPost(),
        watchPostById(),
        watchOpenModalCreatePost(),
        watchCloseModalCreatePost(),
        watchFiltersChange(),
        watchFiltersGet(),
        watchCategoriesAll(),
        watchPostCommentsById(),
        watchChangeVoteComments(),
        watchChangeComment(),
        watchDeleteComment()
    ])
}