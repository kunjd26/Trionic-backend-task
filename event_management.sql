-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2024 at 03:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `total_seats` int(4) NOT NULL,
  `available_seats` int(4) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `date`, `total_seats`, `available_seats`, `is_deleted`, `created_by`) VALUES
(1, 'Foo1', 'Desc1', '2024-05-13', 11, 0, 0, 1),
(2, 'Foo2', 'Desc2', '2024-05-13', 20, 20, 0, 1),
(3, 'Foo3', 'Desc3', '2024-05-13', 30, 20, 0, 2),
(4, 'Foo4', 'Desc4', '2024-05-13', 40, 40, 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `rate_limit` int(1) NOT NULL DEFAULT 5,
  `third_party` int(1) NOT NULL DEFAULT 0,
  `role` varchar(8) NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `rate_limit`, `third_party`, `role`) VALUES
(1, 'Bean', 'admin@foo.foo', '6d87349e6d082e6d238b5121f8eba1a770aad6fb4394a2022abc95d47959ab9ea44bfe38adf3afe0aaeb68fcd8592c7f733739a0dd1dde842252326c9ca2a632', 5, 0, 'admin'),
(2, 'Monty', 'admin1@foo.foo', '6d87349e6d082e6d238b5121f8eba1a770aad6fb4394a2022abc95d47959ab9ea44bfe38adf3afe0aaeb68fcd8592c7f733739a0dd1dde842252326c9ca2a632', 5, 0, 'admin'),
(3, 'Kunj Patel', 'kunj.o727@gmail.com', NULL, 5, 1, 'normal'),
(4, 'Foo bar', 'foo@foo.foo', 'b9bc0c4e706acb110b28d7da4ccff2d19ae0987425f9af2a0e96c5ec27d8a316a84a8662114192a62f981b184c4d618e98b0ced825cf2a9914ec6a1f5fc58c08', 5, 0, 'normal');

-- --------------------------------------------------------

--
-- Table structure for table `user_event`
--

CREATE TABLE `user_event` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `number_of_seats` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_event`
--

INSERT INTO `user_event` (`id`, `user_id`, `event_id`, `number_of_seats`) VALUES
(1, 3, 1, 5),
(2, 4, 1, 5),
(3, 3, 1, 1),
(4, 3, 3, 5),
(5, 3, 3, 3),
(6, 3, 3, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_event`
--
ALTER TABLE `user_event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Event foreign key` (`event_id`),
  ADD KEY `User foreign key` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_event`
--
ALTER TABLE `user_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_event`
--
ALTER TABLE `user_event`
  ADD CONSTRAINT `Event foreign key` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `User foreign key` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
