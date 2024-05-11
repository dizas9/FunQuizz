
import { Link } from 'react-router-dom';
import Clock from './Clock';


export default function Header() {
   
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-sm text-slate-400">
        <Clock />
        <hr className="mt-1" />
      </div>
      <Link to={"/"}>
        <p className="font-stalin text-3xl lg:text-3xl text-[#F5E8C7]">
          FunQuizz
        </p>
      </Link>
      <p className="font-[100] text-sm lg:text-[1rem] text-yellow-300 lg:pt-5">
        Quiz, Learn, Thrive, Repeat, Enjoy
      </p>

      
    </div>
  );
}
