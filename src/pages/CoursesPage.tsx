import React, { useState } from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';
import CourseGrid from '../components/CourseGrid';
import { courses } from '../data/courses';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Get unique categories
  const categories = Array.from(new Set(courses.map(course => course.category)));
  
  // Filter courses based on search term and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filter function above
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">My Courses</h1>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-base-100 rounded-box p-6 shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Improved search form with proper button styling */}
          <form onSubmit={handleSearch} className="flex-1 flex">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="input input-bordered w-full pr-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
          
          {/* Improved filter with integrated button */}
          <div className="form-control md:w-64">
            <div className="relative">
              <select 
                className="select select-bordered w-full appearance-none pr-10"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/70">
                <Filter size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Stats */}
      <div className="stats shadow w-full mb-8">
        <div className="stat">
          <div className="stat-title">Total Courses</div>
          <div className="stat-value text-primary">{courses.length}</div>
          <div className="stat-desc">In your library</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">In Progress</div>
          <div className="stat-value text-secondary">
            {courses.filter(course => course.progress && course.progress > 0 && course.progress < 100).length}
          </div>
          <div className="stat-desc">Courses you've started</div>
        </div>
        
        <div className="stat">
          <div className="stat-title">Completed</div>
          <div className="stat-value text-accent">
            {courses.filter(course => course.progress === 100).length}
          </div>
          <div className="stat-desc">Finished courses</div>
        </div>
      </div>
      
      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <CourseGrid courses={filteredCourses} />
      ) : (
        <div className="bg-base-100 rounded-box p-8 shadow-lg text-center">
          <Search size={48} className="mx-auto mb-4 text-base-content/30" />
          <h2 className="text-xl font-bold mb-2">No Courses Found</h2>
          <p className="text-base-content/70">
            We couldn't find any courses matching your search criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
