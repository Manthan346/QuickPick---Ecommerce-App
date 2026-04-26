import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, User, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";
import { useSearch } from "../Context/SearchContext";
import { userName } from "../../api";
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleSearch, cartCount, token, Logout } = useSearch();
  const [username, setUserName] = useState("");

  const getUserName = async () => {
    const response = await userName();
    const result = response.data.name;
    setUserName(result);
  };

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const count = cartCount();

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
      isActive
        ? "bg-accent text-foreground"
        : "text-foreground hover:text-foreground hover:bg-accent/50"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all font-mono duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-lg shadow-md border-b border-border/40"
            : "bg-background border-b border-border"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Left */}
            <NavLink
              to="/"
              end
              className="flex-shrink-0 z-10"
            >
              
                  <img src={logo} className="h-25 w-25" alt="" />
              
            </NavLink>

            {/* Desktop Navigation - Center/Right */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-end">
              


              <NavLink to="/collections" className={navLinkClass}>
                Collections
              </NavLink>

              <NavLink to="/order" className={navLinkClass}>
                Orders
              </NavLink>

              {/* Divider */}
              <div className="w-px h-6 bg-border mx-2" />

              {/* Search */}
              <button
                onClick={toggleSearch}
                className="p-2.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={20} className="text-foreground" />
              </button>

              {/* User Account */}
              {token ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors duration-200">
                    <User size={18} className="text-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {username || "Account"}
                    </span>
                    <ChevronDown size={16} className="text-foreground transition-transform group-hover:rotate-180 duration-200" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                    <div className="bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-foreground">{username}</p>
                        <p className="text-xs text-foreground">My Account</p>
                      </div>
                      <button
                        onClick={Logout}
                        className="w-full px-4 py-2.5 text-sm text-left text-foreground hover:bg-accent hover:text-foreground transition-colors duration-150"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow"
                >
                  Login
                </NavLink>
              )}

              {/* Cart */}
              <NavLink 
                to="/cart" 
                className="relative p-2.5 rounded-md hover:bg-accent transition-colors duration-200 group"
              >
                <ShoppingCart size={20} className="text-foreground group-hover:text-foreground transition-colors" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-sm">
                    {count}
                  </span>
                )}
              </NavLink>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <button
                onClick={toggleSearch}
                className="p-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="text-foreground" />
              </button>

              <NavLink to="/cart" className="relative p-2 rounded-md hover:bg-accent transition-colors">
                <ShoppingCart size={20} className="text-foreground" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    {count}
                  </span>
                )}
              </NavLink>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-foreground" />
                ) : (
                  <Menu size={24} className="text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[500px] border-t border-border" : "max-h-0"
          }`}
        >
          <div className="px-4 py-6 space-y-2 bg-background">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/mens"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-foreground hover:bg-accent hover:text-foreground"
                }`
              }
            >
              Contact us
            </NavLink>
           
           
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/collections"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-foreground hover:bg-accent hover:text-foreground"
                }`
              }
            >
              Collections
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/order"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-foreground hover:bg-accent hover:text-foreground"
                }`
              }
            >
              My Orders
            </NavLink>

            <div className="pt-4 border-t border-border mt-4 space-y-2">
              {token ? (
                <>
                  <div className="px-4 py-2 rounded-lg bg-accent/50">
                    <p className="text-sm font-medium text-foreground">{username}</p>
                    <p className="text-xs text-foreground">Account</p>
                  </div>
                  <button
                    onClick={() => {
                      Logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-foreground transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  to="/login"
                  className="block px-4 py-3 text-center rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />

      <SearchBar />
    </>
  );
};

export default Navbar;