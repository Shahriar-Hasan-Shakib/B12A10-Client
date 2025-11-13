import { CloseIcon, MenuIcon } from '@src/assets/icons';
import { ADD_MODEL, ALL_MODELS, HOME, AUTH, MY_MODELS, MY_PURCHASES } from '@src/constants/';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '@src/hooks';
import type { User } from 'firebase/auth';
import s from './style.module.css';

const navigationLinks = [
    { name: '🏠 Home', path: HOME, icon: '🏠' },
    { name: '➕ Add Model', path: ADD_MODEL, icon: '➕' },
    { name: '🔍 All Models', path: ALL_MODELS, icon: '🔍' },
];

export const Header: React.FC<{ user?: User | null }> = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const handleLogout = async () => {
        try {
            await signOut();
            setShowDropdown(false);
            navigate(HOME);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };

        if (isMenuOpen || showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen, showDropdown]);

    return (
        <header className={`${s.header} ${scrolled ? s.scrolled : ''}`} ref={headerRef}>
            <div className={s.container}>
                <NavLink className={s.logo} to={"/"}>
                    <span className={s.logoIcon}>🤖</span>
                    <h1 className={s.logoText}>AI Models</h1>
                </NavLink>

                <nav className={`${s.nav} ${isMenuOpen ? s.navOpen : ''}`}>
                    {navigationLinks.map((link) => (
                        <NavLink key={link.path} onClick={toggleMenu} to={link.path}
                            className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ''}`}
                        >
                            <span className={s.navIcon}>{link.icon}</span>
                            <span>{link.name.split(' ').slice(1).join(' ')}</span>
                        </NavLink>
                    ))}

                    <div className={s.navActions}>
                        {user ? (
                            <div className={s.userDropdown} ref={dropdownRef}>
                                <button onClick={toggleDropdown} className={s.userButton} aria-label="User menu">
                                    <img
                                        src={user.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.email}
                                        alt={user.displayName || 'User'}
                                        className={s.userAvatar}
                                    />
                                    <span className={s.userNameBtn}>{user.displayName?.split(' ')[0] || 'User'}</span>
                                    <svg className={`${s.dropdownArrow} ${showDropdown ? s.dropdownArrowOpen : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                {showDropdown && (
                                    <div className={s.dropdownMenu}>
                                        <div className={s.userInfo}>
                                            <p className={s.userName}>{user.displayName || 'User'}</p>
                                            <p className={s.userEmail}>{user.email}</p>
                                        </div>
                                        <div className={s.dropdownDivider}></div>
                                        <NavLink
                                            to={MY_PURCHASES}
                                            className={s.dropdownLink}
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <span>💳</span> My Purchases
                                        </NavLink>
                                        <NavLink
                                            to={MY_MODELS}
                                            className={s.dropdownLink}
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <span>📦</span> My Models
                                        </NavLink>
                                        <div className={s.dropdownDivider}></div>
                                        <button
                                            onClick={handleLogout}
                                            className={s.logoutButton}
                                        >
                                            <span>🚪</span> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink onClick={toggleMenu} to={AUTH} className={s.navBtn}>
                                <span>🔐</span> Login
                            </NavLink>
                        )}
                    </div>
                </nav>

                <button className={s.menuBtn} onClick={toggleMenu} aria-label='Toggle Menu'>
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>
        </header>
    );
};
