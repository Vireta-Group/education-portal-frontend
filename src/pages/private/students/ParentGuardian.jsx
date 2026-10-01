import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Users } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/common/FormField';
import { Input } from '../../../components/ui/Input';
import { GuardiansManager } from './components/GuardiansManager';

const ParentGuardian = () => {
  const [searchId, setSearchId] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setStudentId(searchId.trim());
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to=".."
          className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Parent &amp; Guardian</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Add, promote, and remove guardians for a student.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <FormField
            label="Student ID"
            name="studentId"
            helperText="GET/POST /students/{student}/guardians"
          >
            <Input
              id="studentId"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. 1"
              autoComplete="off"
            />
          </FormField>
          <Button type="submit" disabled={!searchId.trim()}>
            <Search size={16} />
            Load Guardians
          </Button>
          <Button type="button" variant="outline" onClick={() => setStudentId('')}>
            Clear
          </Button>
        </div>
      </form>

      {studentId && (
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Users size={16} />
          Showing guardians for student{' '}
          <span className="font-medium text-slate-900 dark:text-white">{studentId}</span>
        </div>
      )}

      <GuardiansManager studentId={studentId} />
    </div>
  );
};

export default ParentGuardian;
