import 'react-native-gesture-handler';

import React, { createContext, useContext, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

// --- CONTEXT & INITIAL DATA ---
const AppContext = createContext(null);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const initialProducts = [
  {
    id: '1',
    name: 'Fresh Red Apple',
    category: 'Fruits',
    price: 140,
    oldPrice: 180,
    unit: '1 kg (approx. 4-5 pcs)',
    emoji: '🍎',
    rating: 4.8,
    reviews: 128,
    description:
      'Crisp, juicy and naturally sweet red apples handpicked from Shimla orchards. Rich in dietary fiber, vitamin C, and antioxidants.',
    origin: 'Shimla, Himachal Pradesh',
  },
  {
    id: '2',
    name: 'Robusta Banana',
    category: 'Fruits',
    price: 55,
    oldPrice: 70,
    unit: '1 kg (approx. 6 pcs)',
    emoji: '🍌',
    rating: 4.7,
    reviews: 95,
    description:
      'Naturally ripened Robusta bananas. Excellent energy booster packed with potassium, magnesium, and essential vitamins.',
    origin: 'Theni, Tamil Nadu',
  },
  {
    id: '3',
    name: 'Nagpur Orange',
    category: 'Fruits',
    price: 90,
    oldPrice: 110,
    unit: '1 kg',
    emoji: '🍊',
    rating: 4.6,
    reviews: 74,
    description:
      'Zesty and sweet premium Nagpur oranges. High vitamin C content to boost immunity and rejuvenate your skin.',
    origin: 'Nagpur, Maharashtra',
  },
  {
    id: '4',
    name: 'Alphonso Mango',
    category: 'Fruits',
    price: 220,
    oldPrice: 280,
    unit: '1 kg (approx. 3 pcs)',
    emoji: '🥭',
    rating: 4.9,
    reviews: 210,
    description:
      'The King of Fruits! Luscious, aromatic, and naturally sweet Alphonso mangoes with rich golden pulp.',
    origin: 'Ratnagiri, Maharashtra',
  },
  {
    id: '5',
    name: 'Seedless Green Grapes',
    category: 'Fruits',
    price: 85,
    oldPrice: 105,
    unit: '500 g',
    emoji: '🍇',
    rating: 4.5,
    reviews: 62,
    description:
      'Crispy, sweet, seedless table grapes freshly washed and packed in breathable punnets.',
    origin: 'Nashik, Maharashtra',
  },
  {
    id: '6',
    name: 'Fresh Organic Carrot',
    category: 'Vegetables',
    price: 45,
    oldPrice: 60,
    unit: '1 kg',
    emoji: '🥕',
    rating: 4.8,
    reviews: 88,
    description:
      'Crunchy tender Ooty carrots. Excellent source of beta-carotene, lutein, and vitamin A for healthy eyes.',
    origin: 'Ooty, Tamil Nadu',
  },
  {
    id: '7',
    name: 'Country Tomato',
    category: 'Vegetables',
    price: 35,
    oldPrice: 50,
    unit: '1 kg',
    emoji: '🍅',
    rating: 4.7,
    reviews: 140,
    description:
      'Plump, red, and juicy farm-fresh tomatoes perfect for curries, rasam, and fresh vegetable salads.',
    origin: 'Hosur, Tamil Nadu',
  },
  {
    id: '8',
    name: 'Fresh Baby Potato',
    category: 'Vegetables',
    price: 32,
    oldPrice: 40,
    unit: '1 kg',
    emoji: '🥔',
    rating: 4.6,
    reviews: 115,
    description:
      'Smooth-skinned quality potatoes suitable for roasting, curries, and French fries. Clean and dirt-free.',
    origin: 'Hassan, Karnataka',
  },
  {
    id: '9',
    name: 'Sambhar Onion (Shallots)',
    category: 'Vegetables',
    price: 65,
    oldPrice: 80,
    unit: '1 kg',
    emoji: '🧅',
    rating: 4.7,
    reviews: 80,
    description:
      'Pungent, authentic small onions essential for authentic South Indian sambhar and aromatic seasoning.',
    origin: 'Dindigul, Tamil Nadu',
  },
  {
    id: '10',
    name: 'Fresh Green Broccoli',
    category: 'Vegetables',
    price: 75,
    oldPrice: 95,
    unit: '1 pc (approx. 400g)',
    emoji: '🥦',
    rating: 4.8,
    reviews: 53,
    description:
      'Dark green, crisp florets packed with antioxidants, iron, and fiber. Superfood for healthy diets.',
    origin: 'Kodaikanal, Tamil Nadu',
  },
  {
    id: '11',
    name: 'Farm Fresh Cow Milk',
    category: 'Dairy',
    price: 34,
    oldPrice: 38,
    unit: '500 ml Pouch',
    emoji: '🥛',
    rating: 4.9,
    reviews: 310,
    description:
      'Pure, pasteurized, homogenized fresh cow milk. Wholesome nutrition rich in calcium and vitamin D.',
    origin: 'Local Dairy Farm',
  },
  {
    id: '12',
    name: 'Natural Cheddar Cheese',
    category: 'Dairy',
    price: 115,
    oldPrice: 140,
    unit: '200 g Block',
    emoji: '🧀',
    rating: 4.7,
    reviews: 77,
    description:
      'Rich and creamy processed cheddar cheese block. Melts smoothly over toasts, pizzas, and pastas.',
    origin: 'Amul Dairy',
  },
  {
    id: '13',
    name: 'Farm Fresh White Eggs',
    category: 'Dairy',
    price: 85,
    oldPrice: 100,
    unit: 'Pack of 12 pcs',
    emoji: '🥚',
    rating: 4.9,
    reviews: 190,
    description:
      'Grade-A farm eggs, cleaned and checked for quality. High biological value protein for daily wellness.',
    origin: 'Namakkal, Tamil Nadu',
  },
  {
    id: '14',
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    price: 45,
    oldPrice: 55,
    unit: '400 g Loaf',
    emoji: '🍞',
    rating: 4.6,
    reviews: 64,
    description:
      'Soft, oven-fresh 100% whole wheat bread loaf. Free from maida, artificial colors, and palm oil.',
    origin: 'Dmart Fresh Bakery',
  },
  {
    id: '15',
    name: 'Basmati Rice (Royal Grain)',
    category: 'Grains',
    price: 110,
    oldPrice: 145,
    unit: '1 kg',
    emoji: '🍚',
    rating: 4.9,
    reviews: 142,
    description:
      'Aged, long-grain fragrant Basmati rice. Slender grains cook fluffy and double in size for biryani.',
    origin: 'Dehradun, Uttarakhand',
  },
  {
    id: '16',
    name: 'Fresh Orange Juice',
    category: 'Beverages',
    price: 90,
    oldPrice: 120,
    unit: '1 Litre Bottle',
    emoji: '🧃',
    rating: 4.8,
    reviews: 83,
    description:
      '100% cold-pressed orange juice without added sugar, preservatives, or artificial additives.',
    origin: 'Dmart Fresh Press',
  },
];

const categories = [
  { id: 'All', name: 'All', icon: 'grid-outline' },
  { id: 'Fruits', name: 'Fruits', icon: 'nutrition-outline' },
  { id: 'Vegetables', name: 'Vegetables', icon: 'leaf-outline' },
  { id: 'Dairy', name: 'Dairy', icon: 'water-outline' },
  { id: 'Bakery', name: 'Bakery', icon: 'restaurant-outline' },
  { id: 'Grains', name: 'Grains', icon: 'basket-outline' },
  { id: 'Beverages', name: 'Beverages', icon: 'cafe-outline' },
];

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(['1', '3']);
  const [accounts, setAccounts] = useState([
    {
      id: 'admin',
      name: 'Store Manager',
      email: 'admin@dmart.com',
      secondaryEmail: 'admin@dmart.com',
      phone: '+91 98765 43210',
      address: "Sivani's Dmart Store #1, Anna Nagar, Chennai",
      password: 'admin123',
      role: 'Admin',
    },
    {
      id: 'cust1',
      name: 'Sivani Sakthivel',
      email: 'sivani@gmail.com',
      phone: '+91 94433 22110',
      address: 'No 45, Greenways Road, RA Puram, Chennai - 600028',
      password: 'password123',
      role: 'Customer',
    },
  ]);

  const login = (email, password, role) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Match by email or secondaryEmail and password
    const account = accounts.find(
      (a) =>
        (a.email.toLowerCase() === cleanEmail ||
          (a.secondaryEmail && a.secondaryEmail.toLowerCase() === cleanEmail)) &&
        a.password.trim() === cleanPassword
    );

    if (!account) {
      if (role === 'Admin' || cleanEmail.includes('admin')) {
        Alert.alert(
          'Admin Login Failed',
          'Incorrect email or password for Admin.\n\nDefault Credentials:\nEmail: admin@dmart.com\nPassword: admin123'
        );
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid email or password. Please check your credentials or create a customer account.'
        );
      }
      return false;
    }

    setUser(account);
    return true;
  };

  const signup = (name, email, phone, password) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Required', 'Please fill in your name, email, and password.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Password Too Short', 'Password must have at least 6 characters.');
      return false;
    }

    if (accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase())) {
      Alert.alert('Account Exists', 'This email is already registered. Please log in.');
      return false;
    }

    const newAccount = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+91 98765 00000',
      address: '123 Market Street, Chennai - 600001',
      password,
      role: 'Customer',
    };

    setAccounts((prev) => [...prev, newAccount]);
    Alert.alert('Success', 'Account created successfully! Please log in.');
    return true;
  };

  const updateProfile = (name, email, phone, address) => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Required', 'Name and email are required.');
      return false;
    }

    const updated = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
    };

    setUser(updated);
    setAccounts((prev) => prev.map((a) => (a.id === user.id ? updated : a)));
    Alert.alert('Profile Updated', 'Your profile details have been saved.');
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (product, qtyToAdd = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qtyToAdd } : item
        );
      }
      return [...prev, { ...product, qty: qtyToAdd }];
    });
    Alert.alert('Added to Cart', `${product.name} (${qtyToAdd}x) added to cart.`);
  };

  const addAllFavoritesToCart = () => {
    const favoriteItems = products.filter((p) => favorites.includes(p.id));
    if (favoriteItems.length === 0) {
      Alert.alert('No Favorites', 'You do not have any favorite products yet.');
      return;
    }

    setCart((prev) => {
      let updated = [...prev];
      favoriteItems.forEach((fav) => {
        const existing = updated.find((item) => item.id === fav.id);
        if (existing) {
          updated = updated.map((item) =>
            item.id === fav.id ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          updated.push({ ...fav, qty: 1 });
        }
      });
      return updated;
    });

    Alert.alert(
      'Favorites Added!',
      `Added ${favoriteItems.length} favorite items to your cart.`
    );
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: Date.now().toString(),
        rating: 5.0,
        reviews: 1,
        oldPrice: Math.round(product.price * 1.25),
      },
    ]);
  };

  const updateProduct = (id, updated) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated, id } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    Alert.alert('Deleted', 'Product removed successfully.');
  };

  const changePassword = (oldPass, newPass) => {
    if (user.password !== oldPass) {
      Alert.alert('Incorrect Password', 'Your current password is wrong.');
      return false;
    }
    if (newPass.length < 6) {
      Alert.alert('Password Too Short', 'New password must have at least 6 characters.');
      return false;
    }

    const updated = { ...user, password: newPass };
    setUser(updated);
    setAccounts((prev) => prev.map((a) => (a.id === user.id ? updated : a)));
    Alert.alert('Success', 'Password updated successfully!');
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        products,
        cart,
        favorites,
        login,
        signup,
        updateProfile,
        logout,
        toggleFavorite,
        addToCart,
        addAllFavoritesToCart,
        changeQty,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        changePassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

// --- REUSABLE COMPONENTS ---
function PrimaryButton({
  title,
  onPress,
  icon,
  color = '#0F766E',
  outline = false,
  small = false,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.primaryButton,
        small && styles.primaryButtonSmall,
        { backgroundColor: outline ? '#FFFFFF' : color },
        outline
          ? { borderWidth: 1.5, borderColor: color }
          : color === '#0F766E'
          ? styles.primaryButtonTealShadow
          : styles.primaryButtonDarkShadow,
        style,
      ]}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={small ? 15 : 18}
          color={outline ? color : '#FFFFFF'}
          style={{ marginRight: 7 }}
        />
      ) : null}
      <Text
        style={[
          styles.primaryButtonText,
          small && { fontSize: 13 },
          { color: outline ? color : '#FFFFFF' },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.textInput,
          multiline && styles.textInputMultiline,
          isFocused && styles.textInputFocused,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor="#94A3B8"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

// --- SCREENS ---

// 1. WELCOME / ONBOARDING SCREEN (Figma Match)
function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.welcomeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0F766E" />
      <View style={[styles.welcomeHero, { paddingTop: insets.top + 28 }]}>
        <View style={styles.welcomeLogoCircle}>
          <Text style={{ fontSize: 52 }}>🛒</Text>
        </View>
        <View style={styles.badgePill}>
          <Ionicons name="sparkles" size={13} color="#0F766E" />
          <Text style={styles.badgePillText}>100% Organic & Fresh Daily</Text>
        </View>
        <Text style={styles.welcomeBrand}>{"Sivani's Dmart"}</Text>
        <Text style={styles.welcomeTagline}>
          Daily Grocery Food delivered to your doorstep in 15 mins!
        </Text>
      </View>

      <View style={[styles.welcomeCard, { paddingBottom: Math.max(insets.bottom + 20, 28) }]}>
        <Text style={styles.welcomeCardTitle}>Get Started</Text>
        <Text style={styles.welcomeCardSubtitle}>
          Select your portal to continue shopping or managing stock
        </Text>

        <PrimaryButton
          title="Customer Login"
          icon="person"
          color="#0F766E"
          onPress={() => navigation.navigate('Login', { role: 'Customer' })}
        />

        <PrimaryButton
          title="Admin Portal"
          icon="shield-checkmark"
          color="#1E293B"
          onPress={() => navigation.navigate('Login', { role: 'Admin' })}
        />

        <PrimaryButton
          title="Create Customer Account"
          icon="person-add-outline"
          color="#0F766E"
          outline
          onPress={() => navigation.navigate('Signup')}
        />

        <View style={styles.demoCredentialsBox}>
          <Ionicons name="key-outline" size={14} color="#64748B" />
          <Text style={styles.demoCredentialsText}>
            Demo Admin: admin@dmart.com (admin123)
          </Text>
        </View>
      </View>
    </View>
  );
}

// LOGIN SCREEN
function LoginScreen({ navigation, route }) {
  const { login } = useApp();
  const initialRole = route.params?.role || 'Customer';
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState(initialRole === 'Admin' ? 'admin@dmart.com' : '');
  const [password, setPassword] = useState(initialRole === 'Admin' ? 'admin123' : '');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'Admin') {
      setEmail('admin@dmart.com');
      setPassword('admin123');
    } else {
      if (email === 'admin@dmart.com' || email === 'admin@dmark.com') {
        setEmail('');
        setPassword('');
      }
    }
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Required', 'Please enter your email and password.');
      return;
    }
    login(email, password, role);
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
      <View style={styles.authHeader}>
        <Text style={styles.authTitle}>Welcome Back!</Text>
        <Text style={styles.authSubtitle}>
          Login to your {"Sivani's Dmart"} {role} account
        </Text>
      </View>

      <View style={styles.roleToggleContainer}>
        {['Customer', 'Admin'].map((item) => (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            onPress={() => handleRoleChange(item)}
            style={[styles.roleTab, role === item && styles.roleTabActive]}
          >
            <Ionicons
              name={item === 'Admin' ? 'shield-outline' : 'person-outline'}
              size={17}
              color={role === item ? '#FFFFFF' : '#0F766E'}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.roleTabText, role === item && styles.roleTabTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.formCard}>
        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. sivani@gmail.com"
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <PrimaryButton title="Login" icon="log-in-outline" onPress={handleLogin} />

        {role === 'Customer' ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Signup')}
            style={styles.switchAuthLink}
          >
            <Text style={styles.switchAuthText}>
              New to Dmart? <Text style={{ color: '#0F766E', fontWeight: 'bold' }}>Create Account</Text>
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}

// SIGNUP SCREEN
function SignupScreen({ navigation }) {
  const { signup } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    const success = signup(name, email, phone, password);
    if (success) {
      navigation.navigate('Login', { role: 'Customer' });
    }
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
      <View style={styles.authHeader}>
        <Text style={styles.authTitle}>Create Account</Text>
        <Text style={styles.authSubtitle}>
          Join {"Sivani's Dmart"} to get instant fresh grocery delivery
        </Text>
      </View>

      <View style={styles.formCard}>
        <InputField
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Sivani Sundar"
        />
        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. sivani@gmail.com"
          keyboardType="email-address"
        />
        <InputField
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="e.g. +91 94433 22110"
          keyboardType="phone-pad"
        />
        <InputField
          label="Password (min 6 characters)"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter secure password"
          secureTextEntry
        />

        <PrimaryButton title="Sign Up as Customer" icon="checkmark-circle-outline" onPress={handleSignup} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login', { role: 'Customer' })}
          style={styles.switchAuthLink}
        >
          <Text style={styles.switchAuthText}>
            Already have an account? <Text style={{ color: '#0F766E', fontWeight: 'bold' }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// 2. DAILY GROCERY FOOD PRODUCTS LIST SCREEN (Figma Match)
function DailyGroceryScreen({ navigation }) {
  const { products, favorites, toggleFavorite, addToCart, user } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={{ paddingBottom: 35 }}>
      {/* Top Banner (Figma Match) */}
      <View style={styles.heroPromoBanner}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <View style={styles.promoTag}>
            <Text style={styles.promoTagText}>DAILY GROCERY DEAL</Text>
          </View>
          <Text style={styles.promoTitle}>Up to 30% OFF</Text>
          <Text style={styles.promoSubtitle}>Farm Fresh Fruits & Veggies delivered cold</Text>
        </View>
        <View style={styles.promoEmojiCircle}>
          <Text style={{ fontSize: 44 }}>🥦🍎</Text>
        </View>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#0F766E" style={{ marginLeft: 14 }} />
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search fresh fruits, vegetables, dairy..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setSearch('')} style={{ padding: 10 }}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Categories Horizontal Scroll (Figma Match) */}
      <View style={{ marginTop: 16, marginBottom: 8 }}>
        <Text style={styles.sectionHeaderTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(cat.id)}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              >
                <Ionicons
                  name={cat.icon}
                  size={15}
                  color={isActive ? '#FFFFFF' : '#0F766E'}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products Grid Header */}
      <View style={styles.productsHeaderRow}>
        <Text style={styles.sectionHeaderTitle}>
          {selectedCategory === 'All' ? 'Daily Grocery Products' : selectedCategory} ({filtered.length})
        </Text>
      </View>

      {/* Products Grid */}
      <View style={styles.productsGrid}>
        {filtered.map((product) => {
          const isFav = favorites.includes(product.id);
          return (
            <TouchableOpacity
              key={product.id}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ProductDetails', { product })}
              style={styles.groceryCard}
            >
              {/* Heart Favorite Toggle */}
              {user?.role === 'Customer' ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cardHeartBtn}
                  onPress={() => toggleFavorite(product.id)}
                >
                  <Ionicons
                    name={isFav ? 'heart' : 'heart-outline'}
                    size={19}
                    color={isFav ? '#EF4444' : '#64748B'}
                  />
                </TouchableOpacity>
              ) : null}

              {/* Emoji Visual */}
              <View style={styles.cardEmojiBox}>
                <Text style={{ fontSize: 46 }}>{product.emoji || '🛍️'}</Text>
              </View>

              {/* Rating Pill */}
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={11} color="#F59E0B" />
                <Text style={styles.ratingBadgeText}>{product.rating} ({product.reviews})</Text>
              </View>

              {/* Name & Unit */}
              <Text style={styles.cardProductName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.cardProductUnit}>{product.unit}</Text>

              {/* Price & Add to Cart Row */}
              <View style={styles.cardPriceRow}>
                <View>
                  <Text style={styles.cardProductPrice}>₹{product.price}</Text>
                  {product.oldPrice ? (
                    <Text style={styles.cardOldPrice}>₹{product.oldPrice}</Text>
                  ) : null}
                </View>

                {user?.role === 'Customer' ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.cardAddButton}
                    onPress={() => addToCart(product, 1)}
                  >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="search-outline" size={36} color="#94A3B8" />
          </View>
          <Text style={styles.emptyStateTitle}>No Products Found</Text>
          <Text style={styles.emptyStateSubtitle}>
            Try searching with a different keyword or category.
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

// 5. PRODUCT DETAILS SCREEN (only Customer - Part I: 5 Marks)
function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { favorites, toggleFavorite, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const isFav = favorites.includes(product.id);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Top Product Hero Box */}
        <View style={[styles.detailsHeroContainer, { paddingTop: insets.top + 16 }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.detailsBackBtn, { top: insets.top + 12 }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#0F766E" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.detailsFavBtn, { top: insets.top + 12 }]}
            onPress={() => toggleFavorite(product.id)}
          >
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={22}
              color={isFav ? '#EF4444' : '#64748B'}
            />
          </TouchableOpacity>

          <View style={styles.detailsEmojiAura}>
            <Text style={{ fontSize: 90 }}>{product.emoji || '🛍️'}</Text>
          </View>
        </View>

        {/* Content Details */}
        <View style={styles.detailsContentBox}>
          <View style={styles.detailsCategoryRow}>
            <View style={styles.detailsCatBadge}>
              <Text style={styles.detailsCatBadgeText}>{product.category}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingBadgeText}>
                {product.rating} ({product.reviews} reviews)
              </Text>
            </View>
          </View>

          <Text style={styles.detailsTitle}>{product.name}</Text>
          <Text style={styles.detailsUnitText}>{product.unit}</Text>

          {/* Pricing & Quantity Counter Row */}
          <View style={styles.detailsPricingRow}>
            <View>
              <Text style={styles.detailsPrice}>₹{product.price}</Text>
              {product.oldPrice ? (
                <Text style={styles.detailsOldPrice}>
                  ₹{product.oldPrice} (Save ₹{product.oldPrice - product.price})
                </Text>
              ) : null}
            </View>

            {/* Counter */}
            <View style={styles.quantityCounter}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.counterBtn}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={18} color="#0F766E" />
              </TouchableOpacity>
              <Text style={styles.counterQtyText}>{quantity}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.counterBtn}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Ionicons name="add" size={18} color="#0F766E" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Highlights */}
          <View style={styles.highlightsRow}>
            <View style={styles.highlightItem}>
              <Ionicons name="leaf-outline" size={17} color="#0F766E" />
              <Text style={styles.highlightText}>100% Organic</Text>
            </View>
            <View style={styles.highlightItem}>
              <Ionicons name="flash-outline" size={17} color="#0F766E" />
              <Text style={styles.highlightText}>15-Min Delivery</Text>
            </View>
            <View style={styles.highlightItem}>
              <Ionicons name="shield-checkmark-outline" size={17} color="#0F766E" />
              <Text style={styles.highlightText}>Quality Assured</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.detailsSectionHeading}>About this Product</Text>
          <Text style={styles.detailsDescription}>{product.description}</Text>

          <Text style={styles.detailsSectionHeading}>Origin & Sourcing</Text>
          <Text style={styles.detailsDescription}>
            Sourced directly from certified farmers in {product.origin}. Cleaned, graded, and packaged under hygienic conditions.
          </Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={[styles.detailsBottomBar, { paddingBottom: Math.max(insets.bottom + 12, 16) }]}>
        <View>
          <Text style={styles.bottomBarTotalLabel}>Total Price</Text>
          <Text style={styles.bottomBarTotalPrice}>₹{product.price * quantity}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.detailsAddToCartBtn}
          onPress={() => {
            addToCart(product, quantity);
            navigation.goBack();
          }}
        >
          <Ionicons name="cart" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.detailsAddToCartText}>Add to Cart ({quantity})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 4. ADD FAVORITE SCREEN (only Customer - Part I: 5 Marks & Part III: 5 Marks)
function FavoritesScreen({ navigation }) {
  const { products, favorites, toggleFavorite, addToCart, addAllFavoritesToCart } = useApp();
  const favoriteItems = products.filter((p) => favorites.includes(p.id));

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={styles.pageTitle}>My Favorites ❤️</Text>
          <Text style={styles.pageSubtitle}>
            {favoriteItems.length} products saved for your grocery list
          </Text>
        </View>

        {favoriteItems.length > 0 ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addAllFavBtn}
            onPress={addAllFavoritesToCart}
          >
            <Ionicons name="cart-outline" size={16} color="#0F766E" style={{ marginRight: 4 }} />
            <Text style={styles.addAllFavBtnText}>Add All to Cart</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {favoriteItems.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="heart-dislike-outline" size={44} color="#94A3B8" />
          </View>
          <Text style={styles.emptyTitle}>No Favorites Saved Yet</Text>
          <Text style={styles.emptySubtitle}>
            Browse our fresh daily grocery items and tap the heart icon on your favorite products!
          </Text>
          <PrimaryButton
            title="Explore Daily Grocery"
            icon="basket-outline"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      ) : (
        favoriteItems.map((item) => (
          <View key={item.id} style={styles.favListItem}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.favEmojiBox}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
              <Text style={{ fontSize: 34 }}>{item.emoji}</Text>
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ProductDetails', { product: item })}
              >
                <Text style={styles.favItemName}>{item.name}</Text>
                <Text style={styles.favItemUnit}>{item.unit}</Text>
                <Text style={styles.favItemPrice}>₹{item.price}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'flex-end', gap: 8 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.favRemoveBtn}
                onPress={() => toggleFavorite(item.id)}
              >
                <Ionicons name="trash-outline" size={16} color="#EF4444" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.favAddCartBtn}
                onPress={() => addToCart(item, 1)}
              >
                <Ionicons name="cart" size={14} color="#FFFFFF" />
                <Text style={styles.favAddCartBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

// 6. MY CART SCREEN (Customer - Part I: 5 Marks & Part III: 5 Marks)
function CartScreen({ navigation }) {
  const { cart, changeQty, clearCart, user } = useApp();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const discount = subtotal > 250 ? 30 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Please add products to your cart before proceeding.');
      return;
    }

    Alert.alert(
      'Order Confirmed! 🎉',
      `Thank you for shopping at Sivani's Dmart!\n\nDelivering to: ${user?.address || 'Your Address'}\nTotal Paid: ₹${grandTotal}\n\nEstimated Delivery: 15-20 Mins.`,
      [
        {
          text: 'Great, Thanks!',
          onPress: () => clearCart(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.pageTitle}>My Cart 🛒</Text>
          <Text style={styles.pageSubtitle}>{cart.length} items ready for delivery</Text>
        </View>

        {cart.length > 0 ? (
          <TouchableOpacity activeOpacity={0.7} onPress={clearCart} style={styles.clearCartBtn}>
            <Ionicons name="trash-bin-outline" size={14} color="#EF4444" style={{ marginRight: 4 }} />
            <Text style={{ color: '#EF4444', fontWeight: '700', fontSize: 13 }}>Clear All</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cart-outline" size={48} color="#94A3B8" />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            {"Looks like you haven't added any fresh groceries to your cart yet."}
          </Text>
          <PrimaryButton
            title="Start Grocery Shopping"
            icon="basket-outline"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      ) : (
        <>
          {/* Cart Items List */}
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItemCard}>
              <View style={styles.cartItemEmojiBox}>
                <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemUnit}>{item.unit}</Text>
                <Text style={styles.cartItemPrice}>
                  ₹{item.price} × {item.qty} = <Text style={{ color: '#0F766E', fontWeight: '800' }}>₹{item.price * item.qty}</Text>
                </Text>
              </View>

              {/* Add / Subtract Quantity (Part III: 5 Marks) */}
              <View style={styles.cartQtyControls}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cartQtyBtn}
                  onPress={() => changeQty(item.id, -1)}
                >
                  <Ionicons name="remove" size={15} color="#0F766E" />
                </TouchableOpacity>
                <Text style={styles.cartQtyValue}>{item.qty}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cartQtyBtn}
                  onPress={() => changeQty(item.id, 1)}
                >
                  <Ionicons name="add" size={15} color="#0F766E" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Delivery Address Card */}
          <View style={styles.addressSummaryCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.locationIconBadge}>
                <Ionicons name="location" size={16} color="#0F766E" />
              </View>
              <Text style={{ fontWeight: '800', color: '#0F172A', fontSize: 14 }}>
                Delivering to:
              </Text>
            </View>
            <Text style={{ color: '#475569', fontSize: 13, marginTop: 6, lineHeight: 18 }}>
              {user?.address || '123 Market Street, Chennai - 600001'}
            </Text>
          </View>

          {/* Bill Summary Card */}
          <View style={styles.billSummaryCard}>
            <Text style={styles.billTitle}>Bill Details</Text>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Subtotal</Text>
              <Text style={styles.billValue}>₹{subtotal}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={[styles.billValue, deliveryFee === 0 && { color: '#16A34A', fontWeight: 'bold' }]}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </Text>
            </View>
            {discount > 0 ? (
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Dmart Super Discount</Text>
                <Text style={[styles.billValue, { color: '#16A34A', fontWeight: 'bold' }]}>
                  -₹{discount}
                </Text>
              </View>
            ) : null}
            <View style={[styles.billRow, styles.billTotalRow]}>
              <Text style={styles.billTotalLabel}>Grand Total</Text>
              <Text style={styles.billTotalValue}>₹{grandTotal}</Text>
            </View>
          </View>

          <PrimaryButton
            title={`Proceed to Checkout • ₹${grandTotal}`}
            icon="checkmark-circle"
            color="#0F766E"
            onPress={handleCheckout}
          />
        </>
      )}
    </ScrollView>
  );
}

// 3. PROFILE & EDIT PROFILE SCREEN (only Customer - Part I: 5 Marks)
function ProfileScreen({ navigation }) {
  const { user, logout } = useApp();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
      {/* Profile Card */}
      <View style={styles.profileHeaderCard}>
        <View style={styles.profileAvatar}>
          <Text style={{ fontSize: 38 }}>👤</Text>
        </View>
        <Text style={styles.profileName}>{user?.name}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
        <View style={styles.profileRoleBadge}>
          <Ionicons name="checkmark-seal" size={14} color="#0F766E" />
          <Text style={styles.profileRoleBadgeText}>Verified {user?.role}</Text>
        </View>
      </View>

      {/* Info Details Card */}
      <View style={styles.profileInfoCard}>
        <View style={styles.profileInfoRow}>
          <View style={styles.profileIconPill}>
            <Ionicons name="call-outline" size={16} color="#0F766E" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileInfoLabel}>Phone Number</Text>
            <Text style={styles.profileInfoText}>{user?.phone || 'Not added'}</Text>
          </View>
        </View>

        <View style={styles.profileDivider} />

        <View style={styles.profileInfoRow}>
          <View style={styles.profileIconPill}>
            <Ionicons name="location-outline" size={16} color="#0F766E" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileInfoLabel}>Delivery Address</Text>
            <Text style={styles.profileInfoText}>{user?.address || 'Not added'}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ gap: 12 }}>
        <PrimaryButton
          title="Edit Profile"
          icon="create-outline"
          color="#0F766E"
          onPress={() => navigation.navigate('EditProfile')}
        />

        <PrimaryButton
          title="Change Password"
          icon="key-outline"
          color="#334155"
          outline
          onPress={() => navigation.navigate('ChangePassword')}
        />

        <PrimaryButton
          title="Logout"
          icon="log-out-outline"
          color="#EF4444"
          outline
          onPress={() => setShowLogoutModal(true)}
        />
      </View>

      {/* Logout Confirmation Modal */}
      <Modal visible={showLogoutModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="log-out" size={32} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to log out of your {"Sivani's Dmart"} account?
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, width: '100%', marginTop: 8 }}>
              <View style={{ flex: 1 }}>
                <PrimaryButton
                  title="Cancel"
                  color="#64748B"
                  outline
                  onPress={() => setShowLogoutModal(false)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <PrimaryButton
                  title="Logout"
                  color="#EF4444"
                  onPress={() => {
                    setShowLogoutModal(false);
                    logout();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// EDIT PROFILE SCREEN (Part I: 5 Marks requirement)
function EditProfileScreen({ navigation }) {
  const { user, updateProfile } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  const handleSave = () => {
    const success = updateProfile(name, email, phone, address);
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
      <View style={styles.formCard}>
        <Text style={styles.sectionHeaderTitle}>Edit Profile Information</Text>
        <Text style={styles.pageSubtitle}>Update your personal and delivery details</Text>

        <View style={{ marginTop: 12 }}>
          <InputField
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
          />
          <InputField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Your email address"
            keyboardType="email-address"
          />
          <InputField
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Your mobile phone number"
            keyboardType="phone-pad"
          />
          <InputField
            label="Delivery Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Complete street, apartment, city, and pincode"
            multiline
          />

          <PrimaryButton
            title="Save Changes"
            icon="save-outline"
            color="#0F766E"
            onPress={handleSave}
          />

          <PrimaryButton
            title="Cancel"
            color="#64748B"
            outline
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

// CHANGE PASSWORD SCREEN
function ChangePasswordScreen({ navigation }) {
  const { changePassword } = useApp();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Required', 'Please enter your current and new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'New password and confirmation do not match.');
      return;
    }
    const success = changePassword(oldPassword, newPassword);
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
      <View style={styles.formCard}>
        <Text style={styles.sectionHeaderTitle}>Update Password</Text>
        <Text style={styles.pageSubtitle}>Ensure your account stays protected</Text>

        <View style={{ marginTop: 12 }}>
          <InputField
            label="Current Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Enter current password"
            secureTextEntry
          />
          <InputField
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Minimum 6 characters"
            secureTextEntry
          />
          <InputField
            label="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter new password"
            secureTextEntry
          />

          <PrimaryButton
            title="Update Password"
            icon="key-outline"
            color="#0F766E"
            onPress={handleUpdate}
          />
        </View>
      </View>
    </ScrollView>
  );
}

// ADMIN PRODUCT MANAGEMENT SCREEN
function AdminProductManagementScreen() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Fruits');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('1 kg');
  const [emoji, setEmoji] = useState('🍎');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setName('');
    setCategory('Fruits');
    setPrice('');
    setUnit('1 kg');
    setEmoji('🍎');
    setDescription('');
    setEditingId(null);
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setName(p.name);
    setCategory(p.category);
    setPrice(String(p.price));
    setUnit(p.unit || '1 kg');
    setEmoji(p.emoji || '🛍️');
    setDescription(p.description || '');
  };

  const handleSave = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Required', 'Please enter product name and price.');
      return;
    }
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      Alert.alert('Invalid Price', 'Price must be a valid number greater than zero.');
      return;
    }

    const payload = {
      name: name.trim(),
      category: category.trim(),
      price: numPrice,
      unit: unit.trim() || '1 kg',
      emoji: emoji.trim() || '🛍️',
      description: description.trim() || 'Fresh organic grocery product.',
      origin: 'Verified Local Producer',
    };

    if (editingId) {
      updateProduct(editingId, payload);
      Alert.alert('Updated', `${payload.name} updated successfully.`);
    } else {
      addProduct(payload);
      Alert.alert('Added', `${payload.name} added to catalog.`);
    }
    resetForm();
  };

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.screenContent}>
      <View style={styles.formCard}>
        <Text style={styles.sectionHeaderTitle}>
          {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
        </Text>
        <InputField label="Product Name" value={name} onChangeText={setName} placeholder="e.g. Fresh Mango" />
        <InputField label="Category" value={category} onChangeText={setCategory} placeholder="Fruits, Vegetables, Dairy..." />
        <InputField label="Price (₹)" value={price} onChangeText={setPrice} placeholder="e.g. 120" keyboardType="numeric" />
        <InputField label="Unit / Weight" value={unit} onChangeText={setUnit} placeholder="e.g. 1 kg / 500g" />
        <InputField label="Emoji Icon" value={emoji} onChangeText={setEmoji} placeholder="e.g. 🥭" />
        <InputField label="Description" value={description} onChangeText={setDescription} placeholder="Nutritional and freshness info" multiline />

        <PrimaryButton
          title={editingId ? 'Save Changes' : 'Add to Catalog'}
          icon={editingId ? 'checkmark-circle' : 'add-circle'}
          color="#0F766E"
          onPress={handleSave}
        />
        {editingId ? (
          <PrimaryButton title="Cancel Edit" color="#64748B" outline onPress={resetForm} />
        ) : null}
      </View>

      <Text style={[styles.sectionHeaderTitle, { marginTop: 22, marginBottom: 12, paddingHorizontal: 4 }]}>
        All Products ({products.length})
      </Text>

      {products.map((p) => (
        <View key={p.id} style={styles.adminProductCard}>
          <View style={styles.adminProductEmojiBox}>
            <Text style={{ fontSize: 28 }}>{p.emoji}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.adminProdName}>{p.name}</Text>
            <Text style={styles.adminProdMeta}>{p.category} • {p.unit} • ₹{p.price}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity activeOpacity={0.7} style={styles.adminEditBtn} onPress={() => startEdit(p)}>
              <Ionicons name="create-outline" size={17} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.adminDeleteBtn} onPress={() => deleteProduct(p.id)}>
              <Ionicons name="trash-outline" size={17} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// --- CUSTOM DRAWER CONTENT (Part II: Drawer Navigation 10 Marks) ---
function CustomDrawerContent(props) {
  const { user, cart, logout } = useApp();
  const insets = useSafeAreaInsets();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: insets.top + 10 }}>
        {/* Drawer Header */}
        <View style={styles.drawerHeader}>
          <View style={styles.drawerAvatar}>
            <Text style={{ fontSize: 30 }}>{user?.role === 'Admin' ? '🛡️' : '🛒'}</Text>
          </View>
          <Text style={styles.drawerUserName}>{user?.name || 'Customer'}</Text>
          <Text style={styles.drawerUserEmail}>{user?.email}</Text>
          <View style={styles.drawerRoleBadge}>
            <Text style={styles.drawerRoleBadgeText}>{user?.role} Portal</Text>
          </View>
        </View>

        {/* Drawer Menu Items */}
        <View style={{ paddingHorizontal: 12, marginTop: 15 }}>
          {user?.role === 'Customer' ? (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('ShopTabs', { screen: 'Home' })}
              >
                <View style={styles.drawerIconBox}>
                  <Ionicons name="home-outline" size={18} color="#0F766E" />
                </View>
                <Text style={styles.drawerItemText}>Daily Grocery Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('ShopTabs', { screen: 'Favorites' })}
              >
                <View style={styles.drawerIconBox}>
                  <Ionicons name="heart-outline" size={18} color="#0F766E" />
                </View>
                <Text style={styles.drawerItemText}>My Favorites</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('ShopTabs', { screen: 'Cart' })}
              >
                <View style={styles.drawerIconBox}>
                  <Ionicons name="cart-outline" size={18} color="#0F766E" />
                </View>
                <Text style={styles.drawerItemText}>My Cart ({cart.length})</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('ShopTabs', { screen: 'Profile' })}
              >
                <View style={styles.drawerIconBox}>
                  <Ionicons name="person-outline" size={18} color="#0F766E" />
                </View>
                <Text style={styles.drawerItemText}>Profile & Settings</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('AdminTabs', { screen: 'Catalog' })}
              >
                <View style={styles.drawerIconBox}>
                  <Ionicons name="storefront-outline" size={18} color="#0F766E" />
                </View>
                <Text style={styles.drawerItemText}>Product Catalog</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.drawerItem}
                onPress={() => props.navigation.navigate('AdminTabs', { screen: 'Management' })}
              >
                <View style={styles.drawerIconBox}>
                  <Ionicons name="create-outline" size={18} color="#0F766E" />
                </View>
                <Text style={styles.drawerItemText}>Product Management</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.drawerDivider} />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.drawerItem}
            onPress={() => setShowLogoutModal(true)}
          >
            <View style={[styles.drawerIconBox, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            </View>
            <Text style={[styles.drawerItemText, { color: '#EF4444', fontWeight: 'bold' }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Drawer Footer */}
      <View style={[styles.drawerFooter, { paddingBottom: insets.bottom + 12 }]}>
        <Text style={styles.drawerFooterText}>{"Sivani's Dmart v2.0"}</Text>
        <Text style={styles.drawerFooterSub}>100% Organic Fresh Groceries</Text>
      </View>

      {/* Logout Modal in Drawer */}
      <Modal visible={showLogoutModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="log-out" size={32} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalSubtitle}>
              Do you want to log out of {"Sivani's Dmart"}?
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, width: '100%', marginTop: 8 }}>
              <View style={{ flex: 1 }}>
                <PrimaryButton
                  title="Cancel"
                  color="#64748B"
                  outline
                  onPress={() => setShowLogoutModal(false)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <PrimaryButton
                  title="Logout"
                  color="#EF4444"
                  onPress={() => {
                    setShowLogoutModal(false);
                    logout();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// --- PART II: TABS NAVIGATION (10 Marks) ---
function CustomerBottomTabs({ navigation }) {
  const { cart } = useApp();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#0F766E',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '800', fontSize: 18, letterSpacing: 0.3 },
        tabBarActiveTintColor: '#0F766E',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          height: 64,
          paddingBottom: 9,
          paddingTop: 7,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
          elevation: 8,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16, padding: 4 }}
          >
            <Ionicons name="menu" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Cart')}
            style={styles.headerRightCartBtn}
          >
            <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
            {cart.length > 0 ? (
              <View style={styles.cartBadgeHeader}>
                <Text style={styles.cartBadgeHeaderText}>
                  {cart.length > 9 ? '9+' : cart.length}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={DailyGroceryScreen}
        options={{
          title: "Sivani's Dmart",
          tabBarLabel: 'Daily Grocery',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'My Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'My Cart',
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
          tabBarBadgeStyle: { backgroundColor: '#EF4444', fontSize: 10, fontWeight: 'bold' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AdminBottomTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E293B',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '800', fontSize: 18, letterSpacing: 0.3 },
        tabBarActiveTintColor: '#0F766E',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          height: 64,
          paddingBottom: 9,
          paddingTop: 7,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
          elevation: 8,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16, padding: 4 }}
          >
            <Ionicons name="menu" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="Catalog"
        component={DailyGroceryScreen}
        options={{
          title: 'Admin Catalog',
          tabBarLabel: 'All Products',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Management"
        component={AdminProductManagementScreen}
        options={{
          title: 'Product Management',
          tabBarLabel: 'Manage Items',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// --- PART II: DRAWER NAVIGATION (10 Marks) ---
function CustomerDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="ShopTabs" component={CustomerBottomTabs} />
    </Drawer.Navigator>
  );
}

function AdminDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="AdminTabs" component={AdminBottomTabs} />
    </Drawer.Navigator>
  );
}

// --- ROOT STACK NAVIGATOR (Part II: Stack Navigation 10 Marks) ---
function RootNavigator() {
  const { user } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0F766E' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '800', fontSize: 17 },
          headerBackTitleVisible: false,
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        {!user ? (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Sign In' }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: 'Customer Sign Up' }}
            />
          </>
        ) : user.role === 'Admin' ? (
          <Stack.Screen
            name="AdminRoot"
            component={AdminDrawerNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="CustomerRoot"
              component={CustomerDrawerNavigator}
              options={{ headerShown: false }}
            />
            {/* Product Details Screen via Stack Navigation (Part I: 5 Marks) */}
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{
                title: 'Product Details',
                headerShown: false,
              }}
            />
            {/* Edit Profile Screen via Stack Navigation (Part I: 5 Marks) */}
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
              options={{ title: 'Change Password' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar backgroundColor="#0F766E" barStyle="light-content" />
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

// --- STYLES (Ultra Clean, Modern & Professional Mobile UI) ---
const styles = StyleSheet.create({
  // Global & Layout
  screenScroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  screenContent: {
    padding: 16,
    paddingBottom: 35,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
    fontWeight: '500',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    paddingHorizontal: 16,
    letterSpacing: -0.2,
  },

  // Welcome Screen
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#0F766E',
    justifyContent: 'space-between',
  },
  welcomeHero: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  welcomeLogoCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    gap: 6,
  },
  badgePillText: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '700',
  },
  welcomeBrand: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  welcomeTagline: {
    fontSize: 15,
    color: '#CCFBF1',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
    fontWeight: '500',
    maxWidth: 290,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeCardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  welcomeCardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
    fontWeight: '500',
  },
  demoCredentialsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 14,
  },
  demoCredentialsText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },

  // Auth (Login / Signup)
  authHeader: {
    marginBottom: 20,
    marginTop: 4,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  authSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
    fontWeight: '500',
  },
  roleToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 11,
  },
  roleTabActive: {
    backgroundColor: '#0F766E',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  roleTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  roleTabTextActive: {
    color: '#FFFFFF',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  textInputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  textInputFocused: {
    borderColor: '#0F766E',
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginTop: 8,
  },
  primaryButtonTealShadow: {
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonDarkShadow: {
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9,
    marginTop: 0,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  switchAuthLink: {
    alignItems: 'center',
    marginTop: 18,
    paddingVertical: 4,
  },
  switchAuthText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },

  // Promo Banner (Figma Match)
  heroPromoBanner: {
    margin: 16,
    marginBottom: 12,
    backgroundColor: '#0F766E',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  promoTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },
  promoTagText: {
    color: '#CCFBF1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  promoSubtitle: {
    fontSize: 12,
    color: '#CCFBF1',
    marginTop: 3,
    maxWidth: 200,
    fontWeight: '500',
    lineHeight: 17,
  },
  promoEmojiCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search Bar
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchBarInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
  },

  // Categories Scroll (Figma Match)
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryChipActive: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },

  // Products Grid
  productsHeaderRow: {
    marginTop: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  groceryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    position: 'relative',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeartBtn: {
    position: 'absolute',
    top: 9,
    right: 9,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardEmojiBox: {
    height: 100,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
    marginBottom: 6,
  },
  ratingBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  cardProductName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  cardProductUnit: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  cardPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardProductPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F766E',
  },
  cardOldPrice: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  cardAddButton: {
    backgroundColor: '#0F766E',
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  // Product Details Screen
  detailsHeroContainer: {
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 45,
    position: 'relative',
  },
  detailsBackBtn: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsFavBtn: {
    position: 'absolute',
    right: 18,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsEmojiAura: {
    width: 135,
    height: 135,
    borderRadius: 68,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  detailsContentBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -22,
    padding: 22,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 6,
  },
  detailsCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsCatBadge: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  detailsCatBadgeText: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  detailsUnitText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  detailsPricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  detailsPrice: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F766E',
  },
  detailsOldPrice: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '700',
    marginTop: 2,
  },
  quantityCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  counterBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  counterQtyText: {
    fontSize: 16,
    fontWeight: '800',
    paddingHorizontal: 16,
    color: '#0F172A',
  },
  highlightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 8,
  },
  highlightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  highlightText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F766E',
  },
  detailsSectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 18,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  detailsDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 21,
    fontWeight: '400',
  },
  detailsBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomBarTotalLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  bottomBarTotalPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F766E',
  },
  detailsAddToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F766E',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 14,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  detailsAddToCartText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Favorites Screen
  addAllFavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(15, 118, 110, 0.2)',
  },
  addAllFavBtnText: {
    color: '#0F766E',
    fontWeight: '800',
    fontSize: 12,
  },
  favListItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  favEmojiBox: {
    width: 65,
    height: 65,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favItemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  favItemUnit: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  favItemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F766E',
    marginTop: 4,
  },
  favRemoveBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favAddCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F766E',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 9,
    gap: 4,
  },
  favAddCartBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  // Cart Screen
  clearCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cartItemEmojiBox: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  cartItemUnit: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  cartItemPrice: {
    fontSize: 13,
    color: '#475569',
    marginTop: 4,
  },
  cartQtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cartQtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  cartQtyValue: {
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 10,
    color: '#0F172A',
  },
  addressSummaryCard: {
    backgroundColor: '#F0FDFA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  locationIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  billSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  billLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  billValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '700',
  },
  billTotalRow: {
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  billTotalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  billTotalValue: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0F766E',
  },

  // Empty State
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  emptyIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 6,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 19,
    fontWeight: '400',
    maxWidth: 280,
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: 30,
    marginTop: 20,
  },
  emptyStateTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 12,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },

  // Profile Screen
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  profileAvatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#0F766E',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  profileEmail: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  profileRoleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    marginTop: 10,
    gap: 4,
  },
  profileRoleBadgeText: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
  },
  profileInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  profileIconPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  profileInfoText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
    marginTop: 1,
  },
  profileDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },

  // Admin Cards
  adminProductCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  adminProductEmojiBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminProdName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  adminProdMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  adminEditBtn: {
    backgroundColor: '#0F766E',
    padding: 9,
    borderRadius: 10,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  adminDeleteBtn: {
    backgroundColor: '#EF4444',
    padding: 9,
    borderRadius: 10,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  // Drawer Styles
  drawerHeader: {
    padding: 20,
    backgroundColor: '#F0FDFA',
    borderBottomWidth: 1,
    borderColor: '#CCFBF1',
  },
  drawerAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#0F766E',
  },
  drawerUserName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  drawerUserEmail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  drawerRoleBadge: {
    backgroundColor: '#0F766E',
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 8,
  },
  drawerRoleBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 12,
  },
  drawerIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
    marginHorizontal: 10,
  },
  drawerFooter: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    paddingTop: 12,
  },
  drawerFooterText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F766E',
  },
  drawerFooterSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },

  // Header Cart Badge
  headerRightCartBtn: {
    marginRight: 16,
    padding: 4,
    position: 'relative',
  },
  cartBadgeHeader: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#0F766E',
  },
  cartBadgeHeaderText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 6,
    letterSpacing: -0.3,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 19,
    fontWeight: '500',
  },
});
