-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2021 at 03:34 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `bpos_app_config`
--

CREATE TABLE `bpos_app_config` (
  `key` varchar(100) DEFAULT NULL,
  `value` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_app_currency_exchange`
--

CREATE TABLE `bpos_app_currency_exchange` (
  `id` int(15) NOT NULL,
  `currency_code` varchar(255) DEFAULT NULL,
  `currency_symbol` varchar(255) DEFAULT NULL,
  `exchange_rate` decimal(23,10) DEFAULT NULL,
  `number_of_decimals` varchar(255) DEFAULT NULL,
  `thousands_separator` varchar(255) DEFAULT NULL,
  `decimal_point` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_app_location`
--

CREATE TABLE `bpos_app_location` (
  `id` int(15) NOT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `company_logo` longblob DEFAULT NULL,
  `location_name` varchar(200) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `fax` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `policy` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_app_migration`
--

CREATE TABLE `bpos_app_migration` (
  `version` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_app_payment_type`
--

CREATE TABLE `bpos_app_payment_type` (
  `id` int(15) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_collection`
--

CREATE TABLE `bpos_collection` (
  `id` int(15) NOT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `collection_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rental_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `room_price` decimal(23,10) DEFAULT NULL,
  `service_price` decimal(23,10) DEFAULT NULL,
  `utility_price` decimal(23,10) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `exchange` decimal(15,6) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_collection`
--

INSERT INTO `bpos_collection` (`id`, `invoice_number`, `collection_time`, `rental_id`, `room_id`, `customer_id`, `room_price`, `service_price`, `utility_price`, `currency`, `exchange`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, '2021-001212', '2021-12-01 08:59:25', 1, 1, 1, '50.0000000000', NULL, NULL, NULL, NULL, NULL, NULL, '2021-12-01 08:59:24', NULL, NULL, NULL, NULL, 0),
(2, '2021-002212', '2021-12-01 08:59:55', 2, 2, 2, '60.0000000000', NULL, NULL, NULL, NULL, NULL, NULL, '2021-12-01 08:59:32', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_collection_payment`
--

CREATE TABLE `bpos_collection_payment` (
  `id` int(15) NOT NULL,
  `collection_id` int(15) DEFAULT NULL,
  `rental_id` int(15) DEFAULT NULL,
  `reservation_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `payment_room_price` decimal(23,10) DEFAULT NULL,
  `payment_room_reservation_price` decimal(23,10) DEFAULT NULL,
  `payment_service_price` decimal(23,10) DEFAULT NULL,
  `payment_utility_price` decimal(23,10) DEFAULT NULL,
  `paid_room_balance` decimal(23,10) DEFAULT NULL,
  `paid_room_reservation_balance` decimal(23,10) DEFAULT NULL,
  `paid_service_balance` decimal(23,10) DEFAULT NULL,
  `paid_utility_balance` decimal(23,10) DEFAULT NULL,
  `credit_room_balance` decimal(23,10) DEFAULT NULL,
  `credit_room_reservation_balance` decimal(23,10) DEFAULT NULL,
  `credit_service_balance` decimal(23,10) DEFAULT NULL,
  `credit_utility_balance` decimal(23,10) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_collection_payment`
--

INSERT INTO `bpos_collection_payment` (`id`, `collection_id`, `rental_id`, `reservation_id`, `room_id`, `customer_id`, `payment_room_price`, `payment_room_reservation_price`, `payment_service_price`, `payment_utility_price`, `paid_room_balance`, `paid_room_reservation_balance`, `paid_service_balance`, `paid_utility_balance`, `credit_room_balance`, `credit_room_reservation_balance`, `credit_service_balance`, `credit_utility_balance`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, 1, 1, 1, 1, 1, '200.0000000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-12-01 08:54:44', NULL, NULL, NULL, NULL, 0),
(2, 2, 2, 2, 2, 2, '150.0000000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-12-15 08:54:44', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_collection_payment_room`
--

CREATE TABLE `bpos_collection_payment_room` (
  `id` int(15) NOT NULL,
  `collection_payment_id` int(15) DEFAULT NULL,
  `collection_id` int(15) DEFAULT NULL,
  `rental_id` int(15) DEFAULT NULL,
  `reservation_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `paid_room_balance` decimal(23,10) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `exchange` decimal(15,6) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_collection_payment_room_reservation`
--

CREATE TABLE `bpos_collection_payment_room_reservation` (
  `id` int(15) NOT NULL,
  `collection_payment_id` int(15) DEFAULT NULL,
  `collection_id` int(15) DEFAULT NULL,
  `rental_id` int(15) DEFAULT NULL,
  `reservation_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `paid_room_reservation_balance` decimal(23,10) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `exchange` decimal(15,6) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_collection_payment_room_service`
--

CREATE TABLE `bpos_collection_payment_room_service` (
  `id` int(15) NOT NULL,
  `collection_payment_id` int(15) DEFAULT NULL,
  `collection_id` int(15) DEFAULT NULL,
  `rental_id` int(15) DEFAULT NULL,
  `reservation_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `service_id` int(15) DEFAULT NULL,
  `paid_room_service_balance` decimal(23,10) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `exchange` decimal(15,6) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_collection_payment_room_utility`
--

CREATE TABLE `bpos_collection_payment_room_utility` (
  `id` int(15) NOT NULL,
  `collection_payment_id` int(15) DEFAULT NULL,
  `collection_id` int(15) DEFAULT NULL,
  `rental_id` int(15) DEFAULT NULL,
  `reservation_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `utility_id` int(15) DEFAULT NULL,
  `paid_room_utility_balance` decimal(23,10) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `exchange` decimal(15,6) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_collection_service_used`
--

CREATE TABLE `bpos_collection_service_used` (
  `collection_id` int(15) DEFAULT NULL,
  `rental_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `service_id` int(15) DEFAULT NULL,
  `qty` decimal(23,10) DEFAULT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `total` decimal(23,10) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `exchange` decimal(15,6) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_collection_utility_used`
--

CREATE TABLE `bpos_collection_utility_used` (
  `collection_id` int(15) DEFAULT NULL,
  `rental_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `utility_id` int(15) DEFAULT NULL,
  `pre_qty` decimal(23,10) DEFAULT NULL,
  `last_qty` decimal(23,10) DEFAULT NULL,
  `used_qty` decimal(23,10) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `total` decimal(23,10) DEFAULT NULL,
  `currency` varchar(100) DEFAULT NULL,
  `exchange` decimal(15,6) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_customer`
--

CREATE TABLE `bpos_customer` (
  `id` int(15) NOT NULL,
  `people_id` int(15) DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_customer`
--

INSERT INTO `bpos_customer` (`id`, `people_id`, `deleted`) VALUES
(1, 1, 0),
(2, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_customer_dependent`
--

CREATE TABLE `bpos_customer_dependent` (
  `id` int(15) NOT NULL,
  `people_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_customer_property`
--

CREATE TABLE `bpos_customer_property` (
  `id` int(15) NOT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `dependent_id` int(15) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `qty` decimal(23,10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_id` int(15) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_employee`
--

CREATE TABLE `bpos_employee` (
  `id` int(15) NOT NULL,
  `people_id` int(15) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `language` varchar(100) DEFAULT NULL,
  `inactive` int(1) DEFAULT 0,
  `reason_inactive` text DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_employee`
--

INSERT INTO `bpos_employee` (`id`, `people_id`, `username`, `password`, `language`, `inactive`, `reason_inactive`, `deleted`) VALUES
(1, 6, NULL, NULL, NULL, 0, NULL, 0),
(2, 7, NULL, NULL, NULL, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_employee_action`
--

CREATE TABLE `bpos_employee_action` (
  `id` int(15) NOT NULL,
  `resource` varchar(200) DEFAULT NULL,
  `action_name` varchar(200) DEFAULT NULL,
  `display_name` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_employee_action`
--

INSERT INTO `bpos_employee_action` (`id`, `resource`, `action_name`, `display_name`, `description`) VALUES
(1, 'employee', 'read:any', 'Update', NULL),
(2, 'employee', 'create:any', 'Update', NULL),
(3, 'employee', 'update:any', 'Update', NULL),
(4, 'employee', 'delete:any', 'Delete', NULL),
(5, 'customer', 'read:any', 'Update', NULL),
(6, 'customer', 'create:any', 'Update', NULL),
(7, 'customer', 'update:any', 'Update', NULL),
(8, 'customer', 'delete:any', 'Delete', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_employee_permission`
--

CREATE TABLE `bpos_employee_permission` (
  `id` int(15) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_employee_permission_action`
--

CREATE TABLE `bpos_employee_permission_action` (
  `permission_id` int(15) DEFAULT NULL,
  `action_id` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_employee_permission_employee`
--

CREATE TABLE `bpos_employee_permission_employee` (
  `employee_id` int(15) DEFAULT NULL,
  `permission_id` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_expense`
--

CREATE TABLE `bpos_expense` (
  `id` int(15) NOT NULL,
  `category_id` int(15) DEFAULT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `amount` decimal(23,10) DEFAULT NULL,
  `tax` decimal(23,10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `request_by` int(1) DEFAULT 0,
  `approved_by` int(1) DEFAULT 0,
  `expense_payment_type` varchar(100) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_expense_category`
--

CREATE TABLE `bpos_expense_category` (
  `id` int(15) NOT NULL,
  `parent_id` int(15) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_expense_file`
--

CREATE TABLE `bpos_expense_file` (
  `id` int(15) NOT NULL,
  `file_name` text DEFAULT NULL,
  `file_data` longblob DEFAULT NULL,
  `expense_id` int(15) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_modules`
--

CREATE TABLE `bpos_modules` (
  `name_key` varchar(100) DEFAULT NULL,
  `desc_key` varchar(100) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `module_id` varchar(100) DEFAULT NULL,
  `sort` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_module_action`
--

CREATE TABLE `bpos_module_action` (
  `action_id` varchar(100) DEFAULT NULL,
  `module_id` varchar(100) DEFAULT NULL,
  `action_name_key` varchar(100) DEFAULT NULL,
  `sort` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_module_action_permission`
--

CREATE TABLE `bpos_module_action_permission` (
  `module_id` varchar(100) DEFAULT NULL,
  `people_id` int(15) DEFAULT NULL,
  `action_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_module_permission`
--

CREATE TABLE `bpos_module_permission` (
  `module_id` varchar(100) DEFAULT NULL,
  `people_id` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_people`
--

CREATE TABLE `bpos_people` (
  `id` int(15) NOT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `dependent_id` int(15) DEFAULT NULL,
  `employee_id` int(15) DEFAULT NULL,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `account_number` varchar(150) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `phone_1` varchar(150) DEFAULT NULL,
  `phone_2` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `telegram` varchar(100) DEFAULT NULL,
  `work` varchar(100) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `company_address` text DEFAULT NULL,
  `national_number` varchar(100) DEFAULT NULL,
  `national_number_expire` timestamp NULL DEFAULT NULL,
  `visa_number` varchar(100) DEFAULT NULL,
  `visa_number_expire` timestamp NULL DEFAULT NULL,
  `passport_number` varchar(100) DEFAULT NULL,
  `passport_number_expire` timestamp NULL DEFAULT NULL,
  `address_1` text DEFAULT NULL,
  `address_2` text DEFAULT NULL,
  `dob` timestamp NULL DEFAULT NULL,
  `age` int(15) DEFAULT NULL,
  `pob` text DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `district` varchar(200) DEFAULT NULL,
  `commune` varchar(200) DEFAULT NULL,
  `village` varchar(200) DEFAULT NULL,
  `zip_code` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_id` int(15) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_people`
--

INSERT INTO `bpos_people` (`id`, `customer_id`, `dependent_id`, `employee_id`, `first_name`, `last_name`, `full_name`, `account_number`, `sex`, `phone_1`, `phone_2`, `email`, `facebook`, `telegram`, `work`, `company_name`, `company_address`, `national_number`, `national_number_expire`, `visa_number`, `visa_number_expire`, `passport_number`, `passport_number_expire`, `address_1`, `address_2`, `dob`, `age`, `pob`, `country`, `city`, `district`, `commune`, `village`, `zip_code`, `description`, `image_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`) VALUES
(1, 1, NULL, NULL, 'A', '`', 'Sok Dara', '', NULL, '012545452', '', '', '', '', 'ABA Bank', '', '#11E, St. 371, Steng Meanchey, Phnom Penh of, Street 371, Phnom Penh', '', NULL, '', NULL, '', NULL, '#11E, St. 371, Steng Meanchey, Phnom Penh of, Street 371, Phnom Penh', '', NULL, NULL, '', '', '', NULL, '', '', '', '', 9, NULL, '2021-12-02 06:45:08', NULL, NULL, NULL, NULL),
(2, 2, NULL, NULL, 'B', '', 'Koe Pisey', '', NULL, '015515415', '', '', '', '', 'ABA Bank', '', '#11E, St. 371, Steng Meanchey, Phnom Penh of, Street 371, Phnom Penh', '', NULL, '', NULL, '', NULL, '#11E, St. 371, Steng Meanchey, Phnom Penh of, Street 371, Phnom Penh', '', NULL, NULL, '', '', '', NULL, '', '', '', '', 10, NULL, '2021-12-02 06:45:10', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_people_file`
--

CREATE TABLE `bpos_people_file` (
  `id` int(15) NOT NULL,
  `file_name` text DEFAULT NULL,
  `file_data` longblob DEFAULT NULL,
  `people_id` int(15) DEFAULT NULL,
  `property_id` int(15) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_people_file`
--

INSERT INTO `bpos_people_file` (`id`, `file_name`, `file_data`, `people_id`, `property_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, '', '', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, '', '', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(3, '', '', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(4, '', '', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(5, '', '', NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(6, '', '', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(7, '', '', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(8, '', '', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(9, '', '', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(10, '', '', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_rental`
--

CREATE TABLE `bpos_rental` (
  `id` int(15) NOT NULL,
  `rental_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `checked_in` timestamp NULL DEFAULT NULL,
  `checked_out` timestamp NULL DEFAULT NULL,
  `qty_people` int(15) DEFAULT NULL,
  `qty` decimal(15,6) DEFAULT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `total` decimal(23,10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_rental`
--

INSERT INTO `bpos_rental` (`id`, `rental_time`, `room_id`, `customer_id`, `checked_in`, `checked_out`, `qty_people`, `qty`, `price`, `unit`, `total`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, '2021-12-04 05:09:20', 1, 1, '2022-01-15 06:05:53', '2022-01-15 06:05:53', NULL, NULL, '150.0000000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, '2021-12-04 05:09:22', 2, 2, '2022-01-15 06:05:53', '2022-01-15 06:05:53', NULL, NULL, '150.0000000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_rental_price`
--

CREATE TABLE `bpos_rental_price` (
  `id` int(15) NOT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_rental_price`
--

INSERT INTO `bpos_rental_price` (`id`, `price`, `unit`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, '150.0000000000', 'Month', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, '170.0000000000', 'Month', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(3, '200.0000000000', 'Month', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(4, '5.0000000000', 'Night', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(5, '7.0000000000', 'Night', NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_rental_service`
--

CREATE TABLE `bpos_rental_service` (
  `id` int(15) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_rental_service`
--

INSERT INTO `bpos_rental_service` (`id`, `name`, `price`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, 'Car Parking', '20.0000000000', NULL, NULL, '2021-11-27 04:44:01', NULL, NULL, NULL, NULL, 0),
(2, 'Elevator', '15.0000000000', NULL, NULL, '2021-11-27 04:44:02', NULL, NULL, NULL, NULL, 0),
(3, 'Security', '25.0000000000', NULL, NULL, '2021-11-27 04:44:03', NULL, NULL, NULL, NULL, 0),
(4, 'Cleaning', '21.0000000000', NULL, NULL, '2021-11-27 04:44:04', NULL, NULL, NULL, NULL, 0),
(5, 'Internet', '12.0000000000', NULL, NULL, '2021-11-27 04:44:05', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_rental_service_used`
--

CREATE TABLE `bpos_rental_service_used` (
  `rental_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `service_id` int(15) DEFAULT NULL,
  `qty` decimal(15,6) DEFAULT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `total` decimal(23,10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bpos_rental_utility`
--

CREATE TABLE `bpos_rental_utility` (
  `id` int(15) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_rental_utility`
--

INSERT INTO `bpos_rental_utility` (`id`, `name`, `price`, `unit`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, 'Water Fee', '20.0000000000', NULL, NULL, NULL, '2021-11-27 04:46:50', NULL, NULL, NULL, NULL, 0),
(2, 'Electric Fee', '10.0000000000', NULL, NULL, NULL, '2021-11-27 05:31:18', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_rental_utility_used`
--

CREATE TABLE `bpos_rental_utility_used` (
  `rental_id` int(15) DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `utility_id` int(15) DEFAULT NULL,
  `pre_qty` decimal(15,6) DEFAULT NULL,
  `last_qty` decimal(15,6) DEFAULT NULL,
  `used_qty` decimal(15,6) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `total` decimal(23,10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_rental_utility_used`
--

INSERT INTO `bpos_rental_utility_used` (`rental_id`, `room_id`, `customer_id`, `utility_id`, `pre_qty`, `last_qty`, `used_qty`, `unit`, `price`, `total`) VALUES
(1, 1, 1, 1, '1.000000', '1052.000000', '101.000000', NULL, '50.0000000000', '100.0000000000'),
(2, 2, 2, 2, '20.000000', '10.000000', '20.000000', NULL, '50.0000000000', '100.0000000000');

-- --------------------------------------------------------

--
-- Table structure for table `bpos_reservation`
--

CREATE TABLE `bpos_reservation` (
  `id` int(15) NOT NULL,
  `reservation_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `room_id` int(15) DEFAULT NULL,
  `customer_id` int(15) DEFAULT NULL,
  `price` decimal(23,10) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `checked_in` timestamp NULL DEFAULT NULL,
  `cancel` int(1) DEFAULT 0,
  `qty_people` int(15) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_reservation`
--

INSERT INTO `bpos_reservation` (`id`, `reservation_time`, `room_id`, `customer_id`, `price`, `unit`, `checked_in`, `cancel`, `qty_people`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, '2021-11-30 06:45:37', 3, NULL, '85.0000000000', NULL, '2021-11-30 05:00:00', 0, NULL, 'note', NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_room`
--

CREATE TABLE `bpos_room` (
  `id` int(15) NOT NULL,
  `floor_id` int(15) DEFAULT NULL,
  `rental_price_id` int(15) DEFAULT NULL,
  `facility_id` text DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `number` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_id` int(15) DEFAULT NULL,
  `rented` int(1) DEFAULT 0,
  `reserved` int(1) DEFAULT 0,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_room`
--

INSERT INTO `bpos_room` (`id`, `floor_id`, `rental_price_id`, `facility_id`, `name`, `number`, `description`, `image_id`, `rented`, `reserved`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, 1, 5, '1,2,3,', 'R-A', 'R-01', 'note', 4, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, 2, 3, '1,2,3,', 'R-B', 'R-02', 'note', 5, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, 3, 2, '1,2,3,', 'R-C', 'R-03', 'note', 6, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(4, 2, 1, '1,2,3,', 'R-B', 'R-02', 'note', 7, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_room_facility`
--

CREATE TABLE `bpos_room_facility` (
  `id` int(15) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `cost` decimal(15,6) DEFAULT NULL,
  `qty` decimal(15,6) DEFAULT NULL,
  `total` decimal(15,6) DEFAULT NULL,
  `image_id` int(15) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_room_facility`
--

INSERT INTO `bpos_room_facility` (`id`, `name`, `cost`, `qty`, `total`, `image_id`, `note`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, 'TV', '550.000000', '550.000000', '110.000000', NULL, 'Edit note', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, 'TV', '20.000000', '20.000000', '40.000000', NULL, 'Edit note', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(3, 'TV', '20.000000', '20.000000', '40.000000', NULL, 'Edit note', NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_room_file`
--

CREATE TABLE `bpos_room_file` (
  `id` int(15) NOT NULL,
  `file_name` text DEFAULT NULL,
  `file_data` longblob DEFAULT NULL,
  `room_id` int(15) DEFAULT NULL,
  `facility_id` int(15) DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_room_file`
--

INSERT INTO `bpos_room_file` (`id`, `file_name`, `file_data`, `room_id`, `facility_id`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, '', '', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, '', '', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(3, '', '', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(4, '', '', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(5, '', '', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(6, '', '', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(7, '', '', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bpos_room_floor`
--

CREATE TABLE `bpos_room_floor` (
  `id` int(15) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `number` varchar(150) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_by` int(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_by` int(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bpos_room_floor`
--

INSERT INTO `bpos_room_floor` (`id`, `name`, `number`, `note`, `created_by`, `created_at`, `updated_by`, `updated_at`, `deleted_by`, `deleted_at`, `deleted`) VALUES
(1, 'F-A', 'F-01', 'Edit note', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, 'F-B', 'F-02', 'Edit note', NULL, NULL, NULL, NULL, NULL, NULL, 0),
(3, 'F-C', 'F-3', 'Edit note', NULL, NULL, NULL, NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bpos_app_currency_exchange`
--
ALTER TABLE `bpos_app_currency_exchange`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_app_location`
--
ALTER TABLE `bpos_app_location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_app_payment_type`
--
ALTER TABLE `bpos_app_payment_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_collection`
--
ALTER TABLE `bpos_collection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_collection_payment`
--
ALTER TABLE `bpos_collection_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_collection_payment_room`
--
ALTER TABLE `bpos_collection_payment_room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_collection_payment_room_reservation`
--
ALTER TABLE `bpos_collection_payment_room_reservation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_collection_payment_room_service`
--
ALTER TABLE `bpos_collection_payment_room_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_collection_payment_room_utility`
--
ALTER TABLE `bpos_collection_payment_room_utility`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_customer`
--
ALTER TABLE `bpos_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_customer_dependent`
--
ALTER TABLE `bpos_customer_dependent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_customer_property`
--
ALTER TABLE `bpos_customer_property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_employee`
--
ALTER TABLE `bpos_employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_employee_action`
--
ALTER TABLE `bpos_employee_action`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_employee_permission`
--
ALTER TABLE `bpos_employee_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_expense`
--
ALTER TABLE `bpos_expense`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_expense_category`
--
ALTER TABLE `bpos_expense_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_expense_file`
--
ALTER TABLE `bpos_expense_file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_people`
--
ALTER TABLE `bpos_people`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_people_file`
--
ALTER TABLE `bpos_people_file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_rental`
--
ALTER TABLE `bpos_rental`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_rental_price`
--
ALTER TABLE `bpos_rental_price`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_rental_service`
--
ALTER TABLE `bpos_rental_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_rental_utility`
--
ALTER TABLE `bpos_rental_utility`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_reservation`
--
ALTER TABLE `bpos_reservation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_room`
--
ALTER TABLE `bpos_room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_room_facility`
--
ALTER TABLE `bpos_room_facility`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_room_file`
--
ALTER TABLE `bpos_room_file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bpos_room_floor`
--
ALTER TABLE `bpos_room_floor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bpos_app_currency_exchange`
--
ALTER TABLE `bpos_app_currency_exchange`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_app_location`
--
ALTER TABLE `bpos_app_location`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_app_payment_type`
--
ALTER TABLE `bpos_app_payment_type`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_collection`
--
ALTER TABLE `bpos_collection`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bpos_collection_payment`
--
ALTER TABLE `bpos_collection_payment`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bpos_collection_payment_room`
--
ALTER TABLE `bpos_collection_payment_room`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_collection_payment_room_reservation`
--
ALTER TABLE `bpos_collection_payment_room_reservation`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_collection_payment_room_service`
--
ALTER TABLE `bpos_collection_payment_room_service`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_collection_payment_room_utility`
--
ALTER TABLE `bpos_collection_payment_room_utility`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_customer`
--
ALTER TABLE `bpos_customer`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bpos_customer_dependent`
--
ALTER TABLE `bpos_customer_dependent`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_customer_property`
--
ALTER TABLE `bpos_customer_property`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_employee`
--
ALTER TABLE `bpos_employee`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bpos_employee_action`
--
ALTER TABLE `bpos_employee_action`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bpos_employee_permission`
--
ALTER TABLE `bpos_employee_permission`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_expense`
--
ALTER TABLE `bpos_expense`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_expense_category`
--
ALTER TABLE `bpos_expense_category`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_expense_file`
--
ALTER TABLE `bpos_expense_file`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bpos_people`
--
ALTER TABLE `bpos_people`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bpos_people_file`
--
ALTER TABLE `bpos_people_file`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bpos_rental`
--
ALTER TABLE `bpos_rental`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bpos_rental_price`
--
ALTER TABLE `bpos_rental_price`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bpos_rental_service`
--
ALTER TABLE `bpos_rental_service`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bpos_rental_utility`
--
ALTER TABLE `bpos_rental_utility`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bpos_reservation`
--
ALTER TABLE `bpos_reservation`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bpos_room`
--
ALTER TABLE `bpos_room`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `bpos_room_facility`
--
ALTER TABLE `bpos_room_facility`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bpos_room_file`
--
ALTER TABLE `bpos_room_file`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bpos_room_floor`
--
ALTER TABLE `bpos_room_floor`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
