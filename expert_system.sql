-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 19 Des 2022 pada 11.36
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expert_system`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_dimensi`
--

CREATE TABLE `tbl_dimensi` (
  `id_dimensi` varchar(5) NOT NULL,
  `nama_dimensi` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_dimensi`
--

INSERT INTO `tbl_dimensi` (`id_dimensi`, `nama_dimensi`) VALUES
('D01', 'Perasaan berubah-ubah'),
('D02', 'Perasaan tidak terkendali'),
('D03', 'Perasaan terbebani lebih'),
('D04', 'Tingkat Stres');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_hasil`
--

CREATE TABLE `tbl_hasil` (
  `id_hasil` varchar(5) NOT NULL,
  `id_user` int(11) NOT NULL,
  `a` varchar(200) NOT NULL,
  `a_predikat` float NOT NULL,
  `z` float NOT NULL,
  `sesi` int(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_hasil`
--

INSERT INTO `tbl_hasil` (`id_hasil`, `id_user`, `a`, `a_predikat`, `z`, `sesi`, `createdAt`) VALUES
('H0000', 201110989, '[0.29,1,0]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0001', 201110989, '[0.29,1,1]', 0.29, 20.52, 1, '2022-12-19 06:31:46'),
('H0002', 201110989, '[0.29,1,1]', 0.29, 32.52, 1, '2022-12-19 06:31:46'),
('H0003', 201110989, '[0.29,0,0]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0004', 201110989, '[0.29,0,1]', 0, 36, 1, '2022-12-19 06:31:46'),
('H0005', 201110989, '[0.29,0,1]', 0, 36, 1, '2022-12-19 06:31:46'),
('H0006', 201110989, '[0.29,0,0]', 0, 36, 1, '2022-12-19 06:31:46'),
('H0007', 201110989, '[0.29,0,1]', 0, 36, 1, '2022-12-19 06:31:46'),
('H0008', 201110989, '[0.29,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0009', 201110989, '[0.71,1,0]', 0, 36, 1, '2022-12-19 06:31:46'),
('H0010', 201110989, '[0.71,1,1]', 0.71, 27.48, 1, '2022-12-19 06:31:46'),
('H0011', 201110989, '[0.71,1,1]', 0.71, 27.48, 1, '2022-12-19 06:31:46'),
('H0012', 201110989, '[0.71,0,0]', 0, 36, 1, '2022-12-19 06:31:46'),
('H0013', 201110989, '[0.71,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0014', 201110989, '[0.71,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0015', 201110989, '[0.71,0,0]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0016', 201110989, '[0.71,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0017', 201110989, '[0.71,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0018', 201110989, '[0,1,0]', 0, 36, 1, '2022-12-19 06:31:46'),
('H0019', 201110989, '[0,1,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0020', 201110989, '[0,1,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0021', 201110989, '[0,0,0]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0022', 201110989, '[0,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0023', 201110989, '[0,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0024', 201110989, '[0,0,0]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0025', 201110989, '[0,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0026', 201110989, '[0,0,1]', 0, 24, 1, '2022-12-19 06:31:46'),
('H0027', 201110989, '[1,1,0]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0028', 201110989, '[1,1,0.33]', 0.33, 20.04, 2, '2022-12-19 06:44:17'),
('H0029', 201110989, '[1,1,0.67]', 0.67, 27.96, 2, '2022-12-19 06:44:17'),
('H0030', 201110989, '[1,0,0]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0031', 201110989, '[1,0,0.33]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0032', 201110989, '[1,0,0.67]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0033', 201110989, '[1,0,0]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0034', 201110989, '[1,0,0.33]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0035', 201110989, '[1,0,0.67]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0036', 201110989, '[0,1,0]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0037', 201110989, '[0,1,0.33]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0038', 201110989, '[0,1,0.67]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0039', 201110989, '[0,0,0]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0040', 201110989, '[0,0,0.33]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0041', 201110989, '[0,0,0.67]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0042', 201110989, '[0,0,0]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0043', 201110989, '[0,0,0.33]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0044', 201110989, '[0,0,0.67]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0045', 201110989, '[0,1,0]', 0, 36, 2, '2022-12-19 06:44:17'),
('H0046', 201110989, '[0,1,0.33]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0047', 201110989, '[0,1,0.67]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0048', 201110989, '[0,0,0]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0049', 201110989, '[0,0,0.33]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0050', 201110989, '[0,0,0.67]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0051', 201110989, '[0,0,0]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0052', 201110989, '[0,0,0.33]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0053', 201110989, '[0,0,0.67]', 0, 24, 2, '2022-12-19 06:44:17'),
('H0054', 201110989, '[1,1,0.67]', 0.67, 15.96, 3, '2022-12-19 06:45:35'),
('H0055', 201110989, '[1,1,0.33]', 0.33, 20.04, 3, '2022-12-19 06:45:35'),
('H0056', 201110989, '[1,1,0]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0057', 201110989, '[1,0,0.67]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0058', 201110989, '[1,0,0.33]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0059', 201110989, '[1,0,0]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0060', 201110989, '[1,0,0.67]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0061', 201110989, '[1,0,0.33]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0062', 201110989, '[1,0,0]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0063', 201110989, '[0,1,0.67]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0064', 201110989, '[0,1,0.33]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0065', 201110989, '[0,1,0]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0066', 201110989, '[0,0,0.67]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0067', 201110989, '[0,0,0.33]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0068', 201110989, '[0,0,0]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0069', 201110989, '[0,0,0.67]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0070', 201110989, '[0,0,0.33]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0071', 201110989, '[0,0,0]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0072', 201110989, '[0,1,0.67]', 0, 36, 3, '2022-12-19 06:45:35'),
('H0073', 201110989, '[0,1,0.33]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0074', 201110989, '[0,1,0]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0075', 201110989, '[0,0,0.67]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0076', 201110989, '[0,0,0.33]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0077', 201110989, '[0,0,0]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0078', 201110989, '[0,0,0.67]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0079', 201110989, '[0,0,0.33]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0080', 201110989, '[0,0,0]', 0, 24, 3, '2022-12-19 06:45:35'),
('H0081', 201110989, '[0.71,1,0]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0082', 201110989, '[0.71,1,1]', 0.71, 15.48, 4, '2022-12-19 06:50:39'),
('H0083', 201110989, '[0.71,1,1]', 0.71, 27.48, 4, '2022-12-19 06:50:39'),
('H0084', 201110989, '[0.71,0,0]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0085', 201110989, '[0.71,0,1]', 0, 36, 4, '2022-12-19 06:50:39'),
('H0086', 201110989, '[0.71,0,1]', 0, 36, 4, '2022-12-19 06:50:39'),
('H0087', 201110989, '[0.71,0,0]', 0, 36, 4, '2022-12-19 06:50:39'),
('H0088', 201110989, '[0.71,0,1]', 0, 36, 4, '2022-12-19 06:50:39'),
('H0089', 201110989, '[0.71,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0090', 201110989, '[0.29,1,0]', 0, 36, 4, '2022-12-19 06:50:39'),
('H0091', 201110989, '[0.29,1,1]', 0.29, 32.52, 4, '2022-12-19 06:50:39'),
('H0092', 201110989, '[0.29,1,1]', 0.29, 32.52, 4, '2022-12-19 06:50:39'),
('H0093', 201110989, '[0.29,0,0]', 0, 36, 4, '2022-12-19 06:50:39'),
('H0094', 201110989, '[0.29,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0095', 201110989, '[0.29,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0096', 201110989, '[0.29,0,0]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0097', 201110989, '[0.29,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0098', 201110989, '[0.29,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0099', 201110989, '[0,1,0]', 0, 36, 4, '2022-12-19 06:50:39'),
('H0100', 201110989, '[0,1,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0101', 201110989, '[0,1,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0102', 201110989, '[0,0,0]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0103', 201110989, '[0,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0104', 201110989, '[0,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0105', 201110989, '[0,0,0]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0106', 201110989, '[0,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0107', 201110989, '[0,0,1]', 0, 24, 4, '2022-12-19 06:50:39'),
('H0108', 201110578, '[1,1,0.33]', 0.33, 20.04, 1, '2022-12-19 06:59:38'),
('H0109', 201110578, '[1,1,0.67]', 0.67, 15.96, 1, '2022-12-19 06:59:38'),
('H0110', 201110578, '[1,1,0]', 0, 36, 1, '2022-12-19 06:59:38'),
('H0111', 201110578, '[1,0,0.33]', 0, 24, 1, '2022-12-19 06:59:38'),
('H0112', 201110578, '[1,0,0.67]', 0, 36, 1, '2022-12-19 06:59:38'),
('H0113', 201110578, '[1,0,0]', 0, 36, 1, '2022-12-19 06:59:38'),
('H0114', 201110578, '[1,0,0.33]', 0, 36, 1, '2022-12-19 06:59:38'),
('H0115', 201110578, '[1,0,0.67]', 0, 36, 1, '2022-12-19 06:59:38'),
('H0116', 201110578, '[1,0,0]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0117', 201110578, '[0,1,0.33]', 0, 36, 1, '2022-12-19 06:59:39'),
('H0118', 201110578, '[0,1,0.67]', 0, 36, 1, '2022-12-19 06:59:39'),
('H0119', 201110578, '[0,1,0]', 0, 36, 1, '2022-12-19 06:59:39'),
('H0120', 201110578, '[0,0,0.33]', 0, 36, 1, '2022-12-19 06:59:39'),
('H0121', 201110578, '[0,0,0.67]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0122', 201110578, '[0,0,0]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0123', 201110578, '[0,0,0.33]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0124', 201110578, '[0,0,0.67]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0125', 201110578, '[0,0,0]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0126', 201110578, '[0,1,0.33]', 0, 36, 1, '2022-12-19 06:59:39'),
('H0127', 201110578, '[0,1,0.67]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0128', 201110578, '[0,1,0]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0129', 201110578, '[0,0,0.33]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0130', 201110578, '[0,0,0.67]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0131', 201110578, '[0,0,0]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0132', 201110578, '[0,0,0.33]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0133', 201110578, '[0,0,0.67]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0134', 201110578, '[0,0,0]', 0, 24, 1, '2022-12-19 06:59:39'),
('H0135', 201110578, '[1,1,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0136', 201110578, '[1,1,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0137', 201110578, '[1,1,1]', 1, 24, 2, '2022-12-19 07:15:02'),
('H0138', 201110578, '[1,0,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0139', 201110578, '[1,0,0]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0140', 201110578, '[1,0,1]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0141', 201110578, '[1,0,0]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0142', 201110578, '[1,0,0]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0143', 201110578, '[1,0,1]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0144', 201110578, '[0,1,0]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0145', 201110578, '[0,1,0]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0146', 201110578, '[0,1,1]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0147', 201110578, '[0,0,0]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0148', 201110578, '[0,0,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0149', 201110578, '[0,0,1]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0150', 201110578, '[0,0,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0151', 201110578, '[0,0,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0152', 201110578, '[0,0,1]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0153', 201110578, '[0,1,0]', 0, 36, 2, '2022-12-19 07:15:02'),
('H0154', 201110578, '[0,1,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0155', 201110578, '[0,1,1]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0156', 201110578, '[0,0,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0157', 201110578, '[0,0,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0158', 201110578, '[0,0,1]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0159', 201110578, '[0,0,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0160', 201110578, '[0,0,0]', 0, 24, 2, '2022-12-19 07:15:02'),
('H0161', 201110578, '[0,0,1]', 0, 24, 2, '2022-12-19 07:15:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_keanggotaan`
--

CREATE TABLE `tbl_keanggotaan` (
  `id_keanggotaan` varchar(5) NOT NULL,
  `batas_bawah` float NOT NULL,
  `batas_tengah` float NOT NULL,
  `batas_atas` float NOT NULL,
  `id_dimensi` varchar(5) NOT NULL,
  `keterangan` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_keanggotaan`
--

INSERT INTO `tbl_keanggotaan` (`id_keanggotaan`, `batas_bawah`, `batas_tengah`, `batas_atas`, `id_dimensi`, `keterangan`) VALUES
('AN100', 7, 14, 21, 'D01', 'Perasaan berubah ubah'),
('AN101', 16.5, 24.75, 33, 'D02', 'Perasaan tidak terkendali'),
('AN102', 3, 6, 9, 'D03', 'Perasaan terbebani lebih'),
('AN103', 12, 24, 36, 'D04', 'Tingkat stres');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_konsultasi`
--

CREATE TABLE `tbl_konsultasi` (
  `id_konsultasi` varchar(5) NOT NULL,
  `id_user` int(11) NOT NULL,
  `jawaban` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`jawaban`)),
  `sesi` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_konsultasi`
--

INSERT INTO `tbl_konsultasi` (`id_konsultasi`, `id_user`, `jawaban`, `sesi`, `createdAt`, `updatedAt`) VALUES
('K001', 201110989, '[12,12,11]', 1, '2022-12-19 06:31:46', '2022-12-19 06:31:46'),
('K002', 201110989, '[6,9,8]', 2, '2022-12-19 06:44:17', '2022-12-19 06:44:17'),
('K003', 201110989, '[0,0,4]', 3, '2022-12-19 06:45:35', '2022-12-19 06:45:35'),
('K004', 201110989, '[9,9,10]', 4, '2022-12-19 06:50:39', '2022-12-19 06:50:39'),
('K005', 201110578, '[5,8,5]', 1, '2022-12-19 06:59:38', '2022-12-19 06:59:38'),
('K006', 201110578, '[5,7,9]', 2, '2022-12-19 07:15:02', '2022-12-19 07:15:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_konsultasi_hasildetail`
--

CREATE TABLE `tbl_konsultasi_hasildetail` (
  `id_konsultasi_hasildetail` varchar(20) NOT NULL,
  `id_user` int(11) NOT NULL,
  `z_score_total` float NOT NULL,
  `sesi` int(11) NOT NULL,
  `id_tingkat_stres` varchar(5) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_konsultasi_hasildetail`
--

INSERT INTO `tbl_konsultasi_hasildetail` (`id_konsultasi_hasildetail`, `id_user`, `z_score_total`, `sesi`, `id_tingkat_stres`, `createdAt`, `updatedAt`) VALUES
('KHD0001', 201110989, 27.2, 1, 'TS03', '2022-12-19 06:31:46', '2022-12-19 06:31:46'),
('KHD0002', 201110989, 25.35, 2, 'TS02', '2022-12-19 06:44:17', '2022-12-19 06:44:17'),
('KHD0003', 201110989, 17.31, 3, 'TS01', '2022-12-19 06:45:35', '2022-12-19 06:45:35'),
('KHD0004', 201110989, 24.68, 4, 'TS02', '2022-12-19 06:50:39', '2022-12-19 06:50:39'),
('KHD0005', 201110578, 17.31, 1, 'TS01', '2022-12-19 06:59:38', '2022-12-19 06:59:38'),
('KHD0006', 201110578, 24, 2, 'TS02', '2022-12-19 07:15:02', '2022-12-19 07:15:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pernyataan`
--

CREATE TABLE `tbl_pernyataan` (
  `id_pernyataan` varchar(5) NOT NULL,
  `id_dimensi` varchar(5) NOT NULL,
  `pernyataan` varchar(200) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_pernyataan`
--

INSERT INTO `tbl_pernyataan` (`id_pernyataan`, `id_dimensi`, `pernyataan`, `createdAt`, `updatedAt`) VALUES
('P01', 'D01', 'Saya merasa suasana hati saya berubah-ubah karena rutinitas kuliah atau saat berada di lingkungan kampus', NULL, NULL),
('P02', 'D02', 'Saya merasa cemas dengan hasil nilai karena saya sulit memahami materi yang disampaikan dosen', NULL, NULL),
('P03', 'D03', 'Saya tidak bisa tidur dengan nyenyak jika tugas kuliah belum saya selesaikan.', NULL, NULL),
('P04', 'D03', 'Saya mengonsumsi obat tidur karena jam tidur saya menjadi berantakan akibat sering begadang menyelesaikan tugas kuliah.', NULL, NULL),
('P05', 'D03', 'Saya mengalami kondisi bangun tidur dalam keadaan tidak segar atau tidak bersemangat.', NULL, NULL),
('P06', 'D02', 'Keringat saya keluar berlebihan pada saat panik dan kesulitan ketika tidak bisa menjawab pertanyaan saat kuliah berlangsung.', NULL, NULL),
('P07', 'D01', 'Saya merasa tidak nafsu makan jika masih banyak tugas kuliah yang belum terselesaikan.', NULL, NULL),
('P08', 'D02', 'Saya lebih sering memarahi orang-orang di sekitar saya ketika sedang mengalami kesulitan dalam mengerjakan tugas.', NULL, NULL),
('P09', 'D01', 'Saya merasa kesulitan dalam berkonsentrasi dan mengingat materi ketika dosen sedang menyampaikan materi.', NULL, NULL),
('P10', 'D03', 'Keringat saya bercucuran ketika saya diminta untuk menjawab soal-soal yang diberi oleh dosen.', NULL, NULL),
('P11', 'D01', 'Meskipun sudah belajar, saya tetap merasa gelisah ketika maju presentasi.', NULL, NULL),
('P12', 'D02', 'Saya merasa jengkel dengan dosen yang memberikan deadline pengerjaan tugas yang terlalu singkat.', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_tingkat_stres`
--

CREATE TABLE `tbl_tingkat_stres` (
  `id_tingkat_stres` varchar(5) NOT NULL,
  `tingkat_stres` varchar(50) NOT NULL,
  `skala_stres` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_tingkat_stres`
--

INSERT INTO `tbl_tingkat_stres` (`id_tingkat_stres`, `tingkat_stres`, `skala_stres`) VALUES
('TS01', 'Stres ringan', 12),
('TS02', 'Stres sedang', 24),
('TS03', 'Stres berat', 36);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `nama_user` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_level` enum('user','admin') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `refresh_token` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `nama_user`, `username`, `password`, `user_level`, `createdAt`, `updatedAt`, `refresh_token`) VALUES
(201110578, 'Abdullah Faza Farhan', 'papaz@mail.com', '$2b$10$4LORwpg1Vkbp7l76UlbQMezsIVK67SZULGw5e1bcr8r7sX.GKPpTG', 'user', '2022-12-19 06:59:00', '2022-12-19 07:14:27', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxMTEwNTc4LCJuYW1hX3VzZXIiOiJBYmR1bGxhaCBGYXphIEZhcmhhbiIsInVzZXJuYW1lIjoicGFwYXpAbWFpbC5jb20iLCJpYXQiOjE2NzE0MzQwNjcsImV4cCI6MTY3MTUyMDQ2N30._nqKSbThEwHCNcjrDn2JZGc6M0bo5nU_thW0PN2jg2Y'),
(201110989, 'Nurul Rachma', 'nurul@gmail.com', '$2b$10$9NF8wfR8JQhPKJhxG3Y0YuX/HBxIXpIypY.WsHg7A74eG.oXwUYlO', 'user', '2022-12-19 06:30:58', '2022-12-19 10:34:00', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxMTEwOTg5LCJuYW1hX3VzZXIiOiJOdXJ1bCBSYWNobWEiLCJ1c2VybmFtZSI6Im51cnVsQGdtYWlsLmNvbSIsInVzZXJfbGV2ZWwiOiJ1c2VyIiwiaWF0IjoxNjcxNDQ2MDQwLCJleHAiOjE2NzE1MzI0NDB9.GqXL3SUPeMc5YB2foqbRrEItl-EiU9Q6dGEFaUQDdzs');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tbl_dimensi`
--
ALTER TABLE `tbl_dimensi`
  ADD PRIMARY KEY (`id_dimensi`);

--
-- Indeks untuk tabel `tbl_hasil`
--
ALTER TABLE `tbl_hasil`
  ADD PRIMARY KEY (`id_hasil`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `tbl_keanggotaan`
--
ALTER TABLE `tbl_keanggotaan`
  ADD PRIMARY KEY (`id_keanggotaan`),
  ADD KEY `id_dimensi` (`id_dimensi`);

--
-- Indeks untuk tabel `tbl_konsultasi`
--
ALTER TABLE `tbl_konsultasi`
  ADD PRIMARY KEY (`id_konsultasi`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `tbl_konsultasi_hasildetail`
--
ALTER TABLE `tbl_konsultasi_hasildetail`
  ADD PRIMARY KEY (`id_konsultasi_hasildetail`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_tingkat_stres` (`id_tingkat_stres`);

--
-- Indeks untuk tabel `tbl_pernyataan`
--
ALTER TABLE `tbl_pernyataan`
  ADD PRIMARY KEY (`id_pernyataan`),
  ADD KEY `id_dimensi` (`id_dimensi`);

--
-- Indeks untuk tabel `tbl_tingkat_stres`
--
ALTER TABLE `tbl_tingkat_stres`
  ADD PRIMARY KEY (`id_tingkat_stres`);

--
-- Indeks untuk tabel `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tbl_hasil`
--
ALTER TABLE `tbl_hasil`
  ADD CONSTRAINT `tbl_hasil_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id`);

--
-- Ketidakleluasaan untuk tabel `tbl_keanggotaan`
--
ALTER TABLE `tbl_keanggotaan`
  ADD CONSTRAINT `tbl_keanggotaan_ibfk_1` FOREIGN KEY (`id_dimensi`) REFERENCES `tbl_dimensi` (`id_dimensi`);

--
-- Ketidakleluasaan untuk tabel `tbl_konsultasi`
--
ALTER TABLE `tbl_konsultasi`
  ADD CONSTRAINT `tbl_konsultasi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id`);

--
-- Ketidakleluasaan untuk tabel `tbl_konsultasi_hasildetail`
--
ALTER TABLE `tbl_konsultasi_hasildetail`
  ADD CONSTRAINT `tbl_konsultasi_hasildetail_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id`),
  ADD CONSTRAINT `tbl_konsultasi_hasildetail_ibfk_3` FOREIGN KEY (`id_tingkat_stres`) REFERENCES `tbl_tingkat_stres` (`id_tingkat_stres`);

--
-- Ketidakleluasaan untuk tabel `tbl_pernyataan`
--
ALTER TABLE `tbl_pernyataan`
  ADD CONSTRAINT `tbl_pernyataan_ibfk_1` FOREIGN KEY (`id_dimensi`) REFERENCES `tbl_dimensi` (`id_dimensi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
