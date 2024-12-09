import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, History } from 'lucide-react';

export function HelpFooter() {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Rehabit. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link
              to="/help/privacy"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
            </Link>
            <Link
              to="/help/terms"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <FileText className="w-4 h-4" />
              <span>Terms & Conditions</span>
            </Link>
            <Link
              to="/help/changelog"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <History className="w-4 h-4" />
              <span>Changelog</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}