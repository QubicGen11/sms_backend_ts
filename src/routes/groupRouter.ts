import Router from 'express'
import groupActions from '../controllers/groupController'

const router=Router()

router.post('/newgroup',groupActions.createNewGroup)
router.post('/assignroletogroup',groupActions.assignRoleToGroup)
router.post('/assigngroup',groupActions.assignUsersToGroup)
 router.get('/allgroups',groupActions.getAllGroups)
router.delete('deletegroup/:groupId',groupActions.deleteCustomGroup)
export default router