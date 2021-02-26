-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.9 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 正在导出表  tam.modules 的数据：~8 rows (大约)
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
REPLACE INTO `modules` (`name`, `title`, `path`, `rank`, `component`, `redirect`, `icon`, `parent`, `order`, `id`, `createdAt`, `updatedAt`, `version`) VALUES
	('Module', '模块管理', 'module', 2, 'Module', '', 'el-icon-video-camera-solid', 'b4d15e2d-d9e1-45d9-8195-c9f200037c8b', 10, '0c21a56e-7ed9-4cbd-917f-2c1e7f85f83c', 1612886310554, 1612886310554, 0),
	('Permission', '权限管理', 'permission', 2, 'Permission', '', 'el-icon-help', 'b4d15e2d-d9e1-45d9-8195-c9f200037c8b', 9, '47bfd7de-2e85-4f5e-b6d6-b6c777b0b4f8', 1612886253646, 1612886253646, 0),
	('Asset', '资产管理', '/asset', 1, 'Layout', '/asset/fixedasset', 'el-icon-s-goods', '0', 1, '642672ec-0ae4-48d7-baf6-3965adf30cdf', 1612878343179, 1612878343179, 0),
	('Department', '部门管理', 'department', 2, 'Department', '', 'el-icon-phone', 'edbc5633-50d3-4c1b-96a7-6dab5021c28e', 7, '88d47573-c05f-4c4a-80ae-ed3da25448e5', 1612885952811, 1612885952811, 0),
	('Website', '网站管理', '/website', 1, 'Layout', '/website/permission', 'el-icon-eleme', '0', 8, 'b4d15e2d-d9e1-45d9-8195-c9f200037c8b', 1612886095757, 1612886095757, 0),
	('Role', '角色管理', 'role', 2, 'Role', '', 'el-icon-s-flag', 'edbc5633-50d3-4c1b-96a7-6dab5021c28e', 6, 'b9ce7453-dcb6-49d0-a5f0-8b8411d6bdc7', 1612885870426, 1612885870426, 0),
	('Material', '耗材', 'material', 2, 'Material', '', 'el-icon-platform-eleme', '642672ec-0ae4-48d7-baf6-3965adf30cdf', 3, 'cf293cb7-3eab-4fc8-937d-069bb861de09', 1612880952955, 1612880952955, 0),
	('System', '系统管理', '/system', 1, 'Layout', '/system/user', 'el-icon-s-tools', '0', 4, 'edbc5633-50d3-4c1b-96a7-6dab5021c28e', 1612885677622, 1612885677622, 0),
	('User', '用户管理', 'user', 2, 'User', '', 'el-icon-user-solid', 'edbc5633-50d3-4c1b-96a7-6dab5021c28e', 5, 'f153ddd2-a516-435e-96f0-83f804b3a085', 1612885794898, 1612885794898, 0),
	('FixedAsset', '固定资产', 'fixedasset', 2, 'FixedAsset', '', 'el-icon-help', '642672ec-0ae4-48d7-baf6-3965adf30cdf', 2, 'f85422bb-5ce1-4572-a734-ed52d15e6fd5', 1612878478857, 1612878478857, 0);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
